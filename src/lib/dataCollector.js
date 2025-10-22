import { getWeatherData } from '../services/weather.js';
import { getExchangeData } from '../services/fx.js';
import { getTimeData } from '../services/time.js';

// Función para realizar reintentos con un número máximo
const fetchWithRetry = async (fetchFunc, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchFunc();
    } catch (error) {
      // Si el error es un 429 (límite de tasa), esperar y reintentar
      if (error.response && error.response.status === 429) {
        const resetTime = error.response.headers['x-ratelimit-reset'];
        const waitTime = resetTime ? (resetTime * 1000 - Date.now()) : delay;

        if (waitTime > 0) {
          console.log(`Intento ${attempt} fallido. Esperando ${waitTime / 1000} segundos antes de reintentar...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Se superaron los intentos de reintento');
};

// Función centralizada para recolectar los datos de clima, tipo de cambio y hora
export const collectCityData = async (cities) => {
  const cityDataPromises = cities.map(async city => {
    const weather = await fetchWithRetry(() => getWeatherData(city.lat, city.lon));
    const exchange = await fetchWithRetry(() => getExchangeData(city.currency));
    const time = await fetchWithRetry(() => getTimeData(city.timezone));

    return {
      city: city.name,
      weather,
      exchange,
      time
    };
  });

  // Esperar a que todas las promesas se resuelvan y retornar los datos
  const cityData = await Promise.all(cityDataPromises);
  return cityData;
};
