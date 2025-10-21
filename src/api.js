import axios from 'axios';
import { logger } from './lib/logger.js';

// Función para obtener datos climáticos
export async function getWeatherData({ lat, lon }) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,wind_speed_10m,uv_index',
        hourly: 'temperature_2m,precipitation_probability,wind_speed_10m,uv_index',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
        timezone: 'auto',
      },
    });

    return response.data;
  } catch (error) {
    logger.error(`Error fetching weather data: ${error.message}`);
    throw new Error('Error fetching weather data');
  }
}

// Función para obtener el tipo de cambio
export async function getExchangeData(currency) {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates[currency];
  } catch (error) {
    logger.error(`Error fetching exchange data: ${error.message}`);
    throw new Error('Error fetching exchange data');
  }
}

// Función para obtener la hora local
export async function getTimeData(timezone) {
  try {
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`);
    return response.data.datetime;
  } catch (error) {
    logger.error(`Error fetching time data: ${error.message}`);
    throw new Error('Error fetching time data');
  }
}
