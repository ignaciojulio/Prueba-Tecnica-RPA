import { getWeatherData } from '../services/weather.js'; // Servicio de clima
import { getExchangeData } from '../services/fx.js'; // Servicio de tipo de cambio
import { getTimeData } from '../services/time.js'; // Servicio de zona horaria

// Función centralizada para recolectar los datos de clima, tipo de cambio y hora
export const collectCityData = async (cities) => {
  const cityDataPromises = cities.map(async city => {
    const weather = await getWeatherData(city.lat, city.lon); // Obtener clima
    const exchange = await getExchangeData(city.currency); // Obtener tipo de cambio
    const time = await getTimeData(city.timezone); // Obtener hora local y diferencia

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
