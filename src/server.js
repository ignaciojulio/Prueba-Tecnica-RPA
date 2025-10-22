import path from 'path';
import dotenv from 'dotenv';
import cron from 'node-cron';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cities from './config/cities.js';
import { logger } from './lib/logger.js';
import { checkWeatherAlert } from './rules/alerts.js'; 
import { collectCityData } from './lib/dataCollector.js';
import { calculateIVV, determineRiskLevel } from './rules/ivv.js';
import { saveRawData, saveProcessedData } from './lib/dataStorage.js';

dotenv.config();
const router = express.Router();

// Obtener el directorio actual usando ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(express.static(path.join(__dirname, '..', 'public'))); 

// Ruta para redirigir a index.html cuando el usuario accede a la raíz
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
});

// Rutas para obtener los datos de las APIs
router.get('/data', async (req, res) => {
  try {
    logger.info('Iniciando la recolección de datos...');

    const cityData = await collectCityData(cities);
    await saveRawData(cityData, 'cityData_raw.json');

    // Procesar los datos de la ciudad
    const processedData = cityData.map(city => {
      const weatherAlerts = checkWeatherAlert(city.weather.temperature_2m, city.weather.precipitation, city.weather.wind_speed_10m);
      const ivv = calculateIVV(weatherAlerts, city.exchange.trend, city.weather.uv_index);
      const riskLevel = determineRiskLevel(ivv);

      return {
        ...city,
        ivv,
        riskLevel,
        alerts: weatherAlerts,
      };
    });

    await saveProcessedData(processedData, 'cityData_processed.json');
    logger.info('Datos recolectados y guardados exitosamente.');

    // Enviar los datos procesados con IVV y alertas
    res.json(processedData);

  } catch (error) {
    logger.error(`Error al recolectar datos: ${error.message}`);
    res.status(500).send('Error al obtener los datos');
  }
});

// Cron job
cron.schedule(process.env.CRON_INTERVAL, async () => {
  logger.info('Ejecutando proceso automatizado...');
  try {
    const cityData = await collectCityData(cities);
    await saveRawData(cityData, 'cityData_raw.json');

    const processedData = cityData.map(city => {
      return {
        ...city,
        ivv: calculateIVV(city.weather, city.exchange, city.time),
        riskLevel: determineRiskLevel(city.ivv),
      };
    });

    await saveProcessedData(processedData, 'cityData_processed.json');
    logger.info('Datos recolectados correctamente.');
  } catch (error) {
    logger.error(`Error al recolectar datos en el cron: ${error.message}`);
  }
});

// Exportar el enrutador de Express usando export
export default router;
