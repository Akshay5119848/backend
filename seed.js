import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Video from './models/video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config.env' });

const MONGO_URL = process.env.MONGO_URL; 

if (!MONGO_URL) {
    console.error("❌ MONGO_URL is not defined in .env");
    process.exit(1);
}

async function seedData() {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ Connected to MongoDB');

        const dataPath = path.join(__dirname, 'enriched_videos.json');
        const videos = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await Video.deleteMany({});
        await Video.insertMany(videos);

        console.log(`✅ Inserted ${videos.length} videos`);
        mongoose.connection.close();
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedData();
