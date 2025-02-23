require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if not specified
const API_KEY = process.env.NEWS_API_KEY;
const COUNTRY = "us";

app.use(cors()); // Fix CORS issue

// Route to get news from NewsAPI
app.get("/news", async (req, res) => {
    try {
        const category = req.query.category || "general";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
