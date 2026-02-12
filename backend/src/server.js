import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import PlaceRoutes from "./routes/PlaceRoutes.js";
import cors from "cors";
dotenv.config();

import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for frontend and backend connection
app.use(
  cors({
    origin: process.env.FR_ORIGIN || "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/", PlaceRoutes);

// Fix for favicon.ico requests
app.get("/favicon.ico", (req, res) => res.status(204).end());

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  console.log("MONGODB connected: SERVER file");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
