import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const ShareMomentModal = ({ isOpen, onClose, onPostSuccess }) => {
  // All hooks MUST be called before any early returns (Rules of Hooks)
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [emotion, setEmotion] = useState("Joy");
  const [displayName, setDisplayName] = useState("Anonymously Yours,");
  const [uploading, setUploading] = useState(false);

  const emotions = [
    "Joy",
    "Love",
    "Peace",
    "Gratitude",
    "Hope",
    "Nostalgia",
    "Longing",
    "Bittersweet",
    "Sadness",
    "Grief",
    "Regret",
    "Heartbreak",
    "Confession",
    "Anger",
    "Closure",
  ];

  // Prevent clicks inside the modal from closing it by stopping propagation
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Create a preview URL when an image is selected
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // Free memory when component unmounts or image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  if (!isOpen) return null;

  // HELPER FUNCTION: Upload Image to Cloudinary
  const uploadImage = async (file) => {
    // 1. Create a FormData object to hold the file and settings
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      // 2. Make the POST request to Cloudinary's upload endpoint
      //    Note: We remove 'api' from the base URL logic here and call fetch directly
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      // 3. Parse the JSON response
      const data = await res.json();
      console.log("Cloudinary debug response:", data);

      // 4. Return the secure URL provided by Cloudinary
      if (data.secure_url) {
        return data.secure_url;
      } else {
        // Cloudinary usually returns an 'error' object with a 'message'
        throw new Error(data.error?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle Empty Fields
    if (!image || !caption || !emotion) {
      alert("Please fill in all required fields.");
      return;
    }

    // Handle Character Limit
    if (caption.length > 255) {
      alert("Caption must be less than 255 characters.");
      return;
    }

    try {
      setUploading(true);
      //Upload Image to Cloudinary and get URL
      const imageURL = await uploadImage(image);

      //Send Post Data (with Image URL) to Backend
      await api.post("/create/post", {
        imageURL,
        caption,
        location,
        mood: emotion,
        sender: displayName,
      });

      if (onPostSuccess) {
        onPostSuccess();
      } else {
        onClose();
        navigate("/browse");
      }
    } catch (error) {
      console.error("Error sharing moment:", error);
      alert("Failed to share moment. Please check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    // 1. Overlay/Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Click outside to close
    >
      {/* 2. Modal Container */}
      <div
        className="bg-white rounded-sm shadow-xl w-full max-w-xl overflow-hidden"
        onClick={handleModalClick}
      >
        <div className="p-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Share your Moment
          </h2>

          {/* Form Fields */}
          <form className="space-y-6">
            {/* Image Upload Area */}
            <div>
              <span className="block text-sm font-semibold text-gray-800 mb-2">
                Image *
              </span>
              <label
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-sm bg-[#fafafa] hover:bg-gray-50 cursor-pointer h-48 items-center transition-colors relative overflow-hidden ${
                  preview ? "p-0 border-none" : ""
                }`}
              >
                <div className="space-y-1 text-center w-full h-full flex flex-col justify-center items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  ) : (
                    <div className="text-xl text-gray-300 font-medium">
                      Click to Upload Image
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Caption */}
            <div>
              <label
                htmlFor="caption"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Caption *
              </label>
              <textarea
                id="caption"
                rows={3}
                className="w-full border border-gray-300 bg-[#fafafa] px-3 py-2 rounded-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 resize-none"
                placeholder="What does this place mean to you?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                id="location"
                className="w-full border border-gray-300 bg-[#fafafa] px-3 py-3 rounded-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
                placeholder="Where is this place?"
              />
            </div>

            {/* Emotion */}
            <div>
              <label
                htmlFor="emotion"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Emotion *
              </label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                id="emotion"
                className="w-full border border-gray-300 bg-[#fafafa] px-3 py-3 rounded-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
                placeholder="How does this place make you feel?"
              >
                {emotions.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Name */}
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                id="displayName"
                className="w-full border border-gray-300 bg-[#fafafa] px-3 py-3 rounded-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800"
                placeholder="Leave empty if you chose not to"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={uploading} // Disable button while uploading
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white transition-colors ${
                  uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#222] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                }`}
              >
                {uploading ? "Uploading..." : "Share Moment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareMomentModal;
