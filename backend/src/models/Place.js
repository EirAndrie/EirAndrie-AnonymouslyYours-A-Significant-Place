import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: [
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
        "Healing",
        "Anger",
        "Closure",
      ],
      default: "Joy",
    },
    location: {
      type: String,
    },
    sender: {
      type: String,
      default: "Anonymous",
    },
    status: {
      type: String,
      enum: ["Active", "Hidden", "Hidden", "Reported"],
      default: "Active",
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    reportReasons: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Place = mongoose.model("Place", placeSchema);
export default Place;
