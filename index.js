import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import videosRoutes from "./routes/videos.js";
import commentsRoutes from "./routes/comments.js";
import playListsRoutes from "./routes/playlists.js";
import authRoutes from "./routes/auth.js";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("✅ Backend is running...");
});
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/playlists", playListsRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URL || "mongodb+srv://akshay2001singh:CdpGFiwJoyHJBIrH@cluster0.j1xgzmo.mongodb.net/")
    .then(() => {
        console.log("✅ DB Connection Successful");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ DB Connection Error:", err);
    });


    