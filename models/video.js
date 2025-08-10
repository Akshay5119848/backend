import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    thumbnailUrl: String,
    duration: String,
    uploadTime: String,
    views: String,
    author: String,
    channelName: String,
    channelLogo: String,
    subscriber: String,
    videoUrl: String,
    description: String,
    likes: Number,
    dislikes: Number,
    commentsCount: Number,
    isLive: Boolean,
    isVerified: Boolean,
    tags: [String],
    category: String,
    language: String,
    resolution: String,
    isHD: Boolean,
    license: String
});

export default mongoose.model('Video', VideoSchema);
