import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    videos: [String] // Array of video IDs
}, { timestamps: true });

export default mongoose.model('Playlist', PlaylistSchema);
