import express from 'express';
import { logger } from './src/lib/logger.js';
import { getWeatherData } from './src/services/weather.js';
import { getExchangeData } from './src/services/fx.js';
import { getTimeData } from './src/services/time.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para obtener los datos de las APIs
app.get('/api/data', async (req, res) => {
  try {
    const cities = [
      { name: 'Nueva York', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York', currency: 'USD' },
      { name: 'Londres', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London', currency: 'GBP' },
      { name: 'Tokio', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo', currency: 'JPY' },
      { name: 'São Paulo', lat: -23.5505, lon: -46.6333, timezone: 'America/Sao_Paulo', currency: 'BRL' },
      { name: 'Sídney', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney', currency: 'AUD' }
    ];

    const cityDataPromises = cities.map(async city => {
      const weather = await getWeatherData(city);
      const exchange = await getExchangeData(city.currency);
      const time = await getTimeData(city.timezone);

      return {
        city: city.name,
        weather,
        exchange,
        time
      };
    });

    const cityData = await Promise.all(cityDataPromises);
    res.json(cityData);

  } catch (error) {
    logger.error(`Error fetching data: ${error.message}`);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
