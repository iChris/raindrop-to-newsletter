import serverless from 'serverless-http';
import express from 'express';
import { getNewsletterData } from '../index.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to get newsletter data
app.post('/api/newsletter', async (req, res) => {
    try {
        const { apiToken, collectionId } = req.body;

        if (!apiToken || !collectionId) {
            return res.status(400).json({ error: 'Missing API Token or Collection ID' });
        }

        const data = await getNewsletterData(apiToken, collectionId);
        res.json(data);
    } catch (error) {
        console.error("Error fetching newsletter data:", error);
        res.status(500).json({ error: error.message });
    }
});

export const handler = serverless(app);
