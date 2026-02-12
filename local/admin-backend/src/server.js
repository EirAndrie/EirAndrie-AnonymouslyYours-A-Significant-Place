import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Place from "./models/Place.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

// Body parser middleware
app.use(express.json());
app.use(
  // Cross origin for frontend and backend
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// GET letters function
app.get("/reported", async (req, res) => {
  try {
    const reportedPlaces = await Place.find({
      isReported: true,
    }).sort({ createdAt: -1 });
    res.json(reportedPlaces);
  } catch (error) {
    console.error("Error fetching REPORTED PLACES:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE place function
app.delete("/:id/delete", async (req, res) => {
  try {
    // Delete the target place ID
    const place = await Place.findByIdAndDelete(req.params.id);
    // Throw error if place did not exist
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    // Success response
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    // Error response
    console.error("Error deleting place:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// KEEP place function (Dismiss Report)
app.put("/:id/keep", async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      { isReported: false },
      { new: true },
    );
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json({ message: "Report dismissed!", place });
  } catch (error) {
    console.error("Error: KEEP place controller", error);
    res
      .status(500)
      .json({ message: "Internal Server Error at KEEP place controller" });
  }
});

// DB Connection and port listening
connectDB()
  .then(() => {
    console.log("MONGO DB Connected Successfully: SERVER.js file");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error: SERVER.js file", error);
    process.exit(1);
  });
