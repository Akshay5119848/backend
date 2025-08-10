import express from 'express';
import Video from '../models/video.js';

const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single video by ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findOne({ id: req.params.id });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
