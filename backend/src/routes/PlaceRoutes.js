import express from "express";
import {
  getPlace,
  createPlace,
  reportPlace,
} from "../controllers/PlaceController.js";

const router = express.Router();

// GET all places
router.get("/posts/feed", getPlace);
// POST Create a post for a place
router.post("/create/post", createPlace);
// POST Report a place
router.post("/place/:id/report", reportPlace);

export default router;
