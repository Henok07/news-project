require('dotenv').config();
console.log("API_KEY:", process.env.NEWS_API_KEY);  // This will help confirm if the API key is correctly loaded

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();
const API_KEY = process.env.NEWS_API_KEY;
const COUNTRY = "us";

// Middleware
app.use(cors());

// Route to get news from NewsAPI
app.get("/news", async (req, res) => {
    try {
        const category = req.query.category || "general";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: "Error fetching news" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
