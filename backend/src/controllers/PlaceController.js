import Place from "../models/Place.js";

// GET: Fetch all posts(places) that are being created
export async function getPlace(req, res) {
  try {
    const { mood, search } = req.query;
    // Only show Active posts to users (hide Reported/Hidden ones)
    const query = { status: "Active" };

    // Filter by mood if provided
    if (mood) {
      query.mood = mood;
    }

    // Search in body via user input
    if (search) {
      query.$text = { $search: search };
    }

    // Sort by createdAt in descending order
    const place = await Place.find(query).sort({ createdAt: -1 });
    res.status(200).json({ message: "Place fetched successfully", place });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch place(PLACE CONTROLLER: Get Function)",
      error: error.message,
    });
  }
}

// POST: Post a new place
export async function createPlace(req, res) {
  try {
    const { imageURL, caption, mood, location, sender } = req.body;
    const place = new Place({
      imageURL,
      caption,
      mood,
      location,
      sender,
    });
    await place.save();

    res.status(201).json({ message: "Place created successfully", place });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create place(PLACE CONTROLLER: Create Function)",
      error: error.message,
    });
  }
}

// REPORT: Report a place
export async function reportPlace(req, res) {
  const { reason, detail } = req.body;

  // Validation: at least one reason or detail must be provided
  //if (!reason && (!detail || detail.trim() === "")) {
  //return res
  //.status(400)
  //.json({ message: "At least one reason or detail must be provided" });
  //}

  try {
    const place = await Place.findById(req.params.id);

    // Edge Case: If Place is not found throw error message
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Combine reason and detail for a more informative report
    const fullReason = reason
      ? detail && detail.trim() !== ""
        ? `${reason}: ${detail}`
        : reason
      : detail;

    // Update place report count and reasons
    place.isReported = true;
    place.reportCount += 1;
    place.reportReasons.push(fullReason);

    // Edge Case: If Place is reported 5 times, hide it for admin review
    if (place.reportCount >= 5) {
      place.status = "Reported";
      await place.save();
      return res.status(200).json({
        message:
          "Place has been hidden for admin review due to multiple reports",
        hidden: true,
        place,
      });
    }

    // Save the updated place
    await place.save();
    res.status(200).json({ message: "Place reported successfully", place });
  } catch (error) {
    res.status(500).json({
      message: "Failed to report place(PLACE CONTROLLER: Report Function)",
      error: error.message,
    });
  }
}
