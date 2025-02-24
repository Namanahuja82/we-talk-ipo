import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import closed from "./routes/closed.js";
import announced from "./routes/announced.js";
import upcoming from "./routes/upcoming.js";
import upcomingSME from "./routes/upcomingSME.js";
import closedSME from "./routes/closedSME.js";
import upcomingAll from "./routes/upcomingAll.js";
import authMiddleware from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/auth", authRoutes);

// Protect API Routes
app.use("/get/closed", authMiddleware, closed);
app.use("/get/announced", authMiddleware, announced);
app.use("/get/upcoming", authMiddleware, upcoming);
app.use("/get/upcomingSME", authMiddleware, upcomingSME);
app.use("/get/closedSME", authMiddleware, closedSME);
app.use("/get/upcomingAll", authMiddleware, upcomingAll);

app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`);
});
