const express = require('express');
const { storeWeatherData, listWeatherFiles, getWeatherFileContent } = require('../controllers/WeatherController');
const router = express.Router();

router.post('/store-weather-data', storeWeatherData);
router.get('/list-weather-files', listWeatherFiles);
router.get('/weather-file-content/:id', getWeatherFileContent);

module.exports = router;  // Export the router directly, not an object
