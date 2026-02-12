import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import PlaceRoutes from "./routes/PlaceRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

// Middleware for frontend and backend connection
app.use(
  cors({
    origin: process.env.FR_ORIGIN || "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/", PlaceRoutes);
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*");

connectDB().then(() => {
  console.log("MONGODB connected: SERVER file");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
