import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import PlaceRoutes from "./routes/PlaceRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for frontend and backend connection
app.use(
  cors({
    origin: process.env.FR_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/", PlaceRoutes);

connectDB().then(() => {
  console.log("MONGODB connected: SERVER file");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
