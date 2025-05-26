import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like index.html, CSS, JS)
app.use(express.static(path.join(__dirname,)));

// API route for Solved.ac data
app.get('/boj', async (req, res) => {
  try {
    const response = await fetch('https://solved.ac/api/v3/user/show?handle=pja5718');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data from Solved.ac' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
