import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { logger } from './lib/logger.js';
import { collectCityData } from './lib/dataCollector.js';
import { saveRawData, saveProcessedData } from './lib/dataStorage.js';
import cities from './config/cities.js';
import cron from 'node-cron';
import { calculateIVV, determineRiskLevel } from './rules/ivv.js';

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

    const processedData = cityData.map(city => {
      return {
        ...city,
        ivv: calculateIVV(city.weather, city.exchange, city.time),
        riskLevel: determineRiskLevel(city.ivv),
      };
    });

    await saveProcessedData(processedData, 'cityData_processed.json');
    logger.info('Datos recolectados y guardados exitosamente.');
    res.json(cityData);

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
