import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import { MapPin, Calendar, Plus, Flag } from "lucide-react";
import ShareMomentModal from "../components/ShareMomentModal";

// The Feed Card Component - just displays the item passed to it
const FeedItem = ({ item }) => {
  const [reported, setReported] = useState(item.isReported);

  const handleReport = async () => {
    if (reported) return;
    try {
      await api.post(`/place/${item._id}/report`, {
        reason: "User flagged",
      });
      setReported(true);
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  return (
    <div className="bg-white p-4 pb-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-3xl mx-auto mb-10 rounded-sm">
      {/* Image Container */}
      <div className="w-full aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
        <img
          src={item.imageURL}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="px-2">
        {/* Category & Report Button */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] tracking-widest text-gray-400 font-medium uppercase block">
            {item.mood}
          </span>
          <button
            onClick={handleReport}
            disabled={reported}
            className={`transition-colors duration-200 ${
              reported
                ? "text-red-500 cursor-default"
                : "text-gray-300 hover:text-red-500"
            }`}
            title={reported ? "Reported" : "Report this post"}
          >
            <Flag size={16} fill={reported ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Main Text */}
        <h2 className="text-sm md:text-lg text-gray-800 font-serif mb-8 leading-relaxed">
          {item.caption}
        </h2>

        {/* Divider */}
        <hr className="border-gray-200 mb-4" />

        {/* Footer Metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-400 font-light gap-4">
          {/* Location & Date Group */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="stroke-[1.5]" />
              <span>{item.location || "Unknown location"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="stroke-[1.5]" />
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Author Signature */}
          <div className="text-right w-full sm:w-auto">
            <span className="text-gray-800 font-cursive text-lg">
              - {item.sender || "Anonymous"},
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Layout
const FeedPage = () => {
  // Control state of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts/feed");
      // API returns { message: "...", place: [...] }
      console.log("Fetched data:", res.data);
      setPosts(res.data.place || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSuccess = () => {
    setIsModalOpen(false);
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <ShareMomentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostSuccess={handlePostSuccess}
      />
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 px-4 md:px-40 py-4 flex justify-between items-center shadow-sm">
        {/* Logo - Using a cursive font style to match 'Anonymously Yours' */}
        <div className="text-2xl font-bold tracking-tight font-cursive cursor-default">
          Anonymously Yours
        </div>

        {/* Action Button */}
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Plus size={16} />
          <span>Share a Moment</span>
        </button>
      </header>
      {/* Feed Container */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">
              No posts yet. Share your first moment!
            </p>
          ) : (
            posts.map((item) => <FeedItem key={item._id} item={item} />)
          )}
        </div>
      </main>
      x{/* Global Style for Custom Font (Optional) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Merriweather:wght@300;400&display=swap');
        
        .font-cursive {
          font-family: 'Caveat', cursive;
        }
        .font-serif {
          font-family: 'Merriweather', serif;
        }
      `}</style>
    </div>
  );
};

export default FeedPage;
