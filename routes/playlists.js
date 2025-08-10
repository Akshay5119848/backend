import express from 'express';
import Playlist from '../models/Playlist.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user's playlists
router.get('/', verifyToken, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a playlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, videos } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });

    const pl = new Playlist({
      name,
      userId: req.userId,
      videos: Array.isArray(videos) ? videos : []
    });

    await pl.save();
    res.status(201).json(pl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add video to playlist
router.put('/:id/add', verifyToken, async (req, res) => {
  try {
    const { videoId } = req.body;
    const pl = await Playlist.findById(req.params.id);
    if (!pl) return res.status(404).json({ message: 'Playlist not found' });
    if (pl.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    if (!pl.videos.includes(videoId)) {
      pl.videos.push(videoId);
      await pl.save();
    }

    res.json(pl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove video from playlist
router.put('/:id/remove', verifyToken, async (req, res) => {
  try {
    const { videoId } = req.body;
    const pl = await Playlist.findById(req.params.id);
    if (!pl) return res.status(404).json({ message: 'Playlist not found' });
    if (pl.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    pl.videos = pl.videos.filter(v => v !== videoId);
    await pl.save();
    res.json(pl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete playlist
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const pl = await Playlist.findById(req.params.id);
    if (!pl) return res.status(404).json({ message: 'Playlist not found' });
    if (pl.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    await pl.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
