const axios = require('axios');

// Función para obtener los datos de clima
async function getWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index`;
  const response = await axios.get(url);
  return response.data;
}

// Función para obtener el tipo de cambio
async function getExchangeData() {
  const url = 'https://api.exchangerate-api.com/v4/latest/USD';
  const response = await axios.get(url);
  return response.data;
}

// Función para obtener la hora local
async function getTimeData(timezone) {
  const url = `http://worldtimeapi.org/api/timezone/${timezone}`;
  const response = await axios.get(url);
  return response.data;
}

// Exportar las funciones para que puedan ser usadas en los tests
module.exports = {
  getWeatherData,
  getExchangeData,
  getTimeData
};
