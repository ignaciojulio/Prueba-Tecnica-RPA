import { makeHttpRequest } from '../lib/http.js'; // Importar la función para hacer peticiones HTTP

// Función para obtener datos climáticos de una ciudad
export const getWeatherData = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index`;
  const data = await makeHttpRequest(url);

  return {
    current: {
      temperature_2m: data.current.temperature_2m,
      wind_speed_10m: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      uv_index: data.current.uv_index
    },
    hourly: data.hourly
  };
};
