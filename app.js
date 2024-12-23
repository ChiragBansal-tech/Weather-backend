const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  
app.use(cors());

app.use('/api/weather', require('./src/routes/WeatherRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
