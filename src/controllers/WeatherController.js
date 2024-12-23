const WeatherData = require('../models/WeatherData');
const { fetchWeatherDataFromAPI } = require('../services/weatherService');

const storeWeatherData = async (req, res) => {
  const { latitude, longitude, start_date, end_date } = req.body;

  try {
    const weatherData = await fetchWeatherDataFromAPI(latitude, longitude, start_date, end_date);
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
};

const listWeatherFiles = async (req, res) => {
  try {
    const files = await WeatherData.find({}, '_id location dateRange');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list weather files' });
  }
};

const getWeatherFileContent = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await WeatherData.findById(id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
};

module.exports = { storeWeatherData, listWeatherFiles, getWeatherFileContent };
