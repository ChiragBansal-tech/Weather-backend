const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  dateRange: {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  data: { type: Object, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WeatherData', weatherDataSchema);
