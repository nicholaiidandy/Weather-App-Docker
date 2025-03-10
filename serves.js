const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// API untuk cuaca
app.post("/weather", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Coordinates required" });
    }

    try {
        // Fetch cuaca
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Fetch lokasi (reverse geocoding)
        const locationResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
        );

        res.json({
            location: locationResponse.data[0]?.name || "Unknown",
            temperature: weatherResponse.data.main.temp,
            weather: weatherResponse.data.weather[0].description
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// Serve frontend statis
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
