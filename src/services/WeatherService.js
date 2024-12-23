const axios = require('axios');

const fetchWeatherDataFromAPI = async (latitude, longitude, startDate, endDate) => {
  try {

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=is_day&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data from Open-Meteo API');
  }
};

module.exports = { fetchWeatherDataFromAPI };
