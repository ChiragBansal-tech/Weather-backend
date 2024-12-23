const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const WeatherData = require('../models/WeatherData');  // Adjust the path as necessary
const { fetchWeatherDataFromAPI } = require('../services/weatherService');  // Adjust the path as necessary

// Initialize the Express app
const app = express();
app.use(express.json());

// MongoDB Connection (ensure MONGODB_URI is configured in environment variables)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// POST /store-weather-data
app.post('/api/weather/store-weather-data', async (req, res) => {
  const { latitude, longitude, start_date, end_date } = req.body;

  try {
    // Fetch weather data from the Open-Meteo API
    const weatherData = await fetchWeatherDataFromAPI(latitude, longitude, start_date, end_date);
    
    // Save the data in MongoDB
    const newEntry = new WeatherData({
      location: { latitude, longitude },
      dateRange: { startDate: start_date, endDate: end_date },
      data: weatherData,
    });
    const savedEntry = await newEntry.save();
    res.status(201).json({ message: 'Weather data saved', id: savedEntry._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store weather data' });
  }
});

// GET /list-weather-files
app.get('/api/weather/list-weather-files', async (req, res) => {
  try {
    const files = await WeatherData.find({}, '_id location dateRange');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list weather files' });
  }
});

// GET /weather-file-content/:id
app.get('/api/weather/weather-file-content/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const file = await WeatherData.findById(id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
});


module.exports.handler = serverless(app);
