import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNewsletterData } from './lib/newsletter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get newsletter data
app.post('/api/newsletter', async (req, res) => {
    try {
        const { apiToken, collectionId } = req.body;
        console.log("Server received body:", req.body);
        console.log("Server extracted token:", apiToken ? apiToken.substring(0, 5) + "..." : "undefined");

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
