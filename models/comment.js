import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    userId: { type: String, required: true },
    username: String,
    avatar: String,
    text: String
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
