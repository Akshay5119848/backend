import express from 'express';
import Comment from '../models/comment.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get comments for a video
router.get('/video/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a comment (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log("Comment POST body:", req.body);
    console.log("Decoded userId:", req.userId);

    const { videoId, text, username, avatar } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: 'User ID missing from token' });
    }

    if (!videoId || !text) {
      return res.status(400).json({ message: 'videoId and text are required' });
    }    

    const comment = new Comment({
      videoId,
      userId: req.userId,
      username: username || 'Unknown',
      avatar: avatar || '',
      text
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ error: err.message });
  }
});



// Edit comment (owner only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text is required' });

    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text },
      { new: true }
    );
    
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete comment (owner only) - simple check using userId
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;