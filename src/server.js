import express from 'express';
import { logger } from './lib/logger.js'; // Para los logs
import { collectCityData } from './lib/dataCollector.js'; // Función centralizada de recolección de datos
import cities from './config/cities.js'; // Importar ciudades
import cron from 'node-cron'; // Para la automatización

const router = express.Router();

// Ruta para obtener los datos de las APIs
router.get('/data', async (req, res) => {
  try {
    logger.info('Iniciando la recolección de datos...');

    // Usamos la nueva función centralizada para recolectar los datos
    const cityData = await collectCityData(cities);
    logger.info('Datos recolectados exitosamente.');

    res.json(cityData); // Retornar los datos de las ciudades

  } catch (error) {
    logger.error(`Error al recolectar datos: ${error.message}`);
    res.status(500).send('Error al obtener los datos');
  }
});

// Configurar el cron con el intervalo definido en el .env
cron.schedule(process.env.CRON_INTERVAL, async () => {
  logger.info('Ejecutando proceso automatizado...');

  try {
    // Usamos la función centralizada para recolectar los datos
    const cityData = await collectCityData(cities);
    logger.info('Datos recolectados correctamente:', cityData);

  } catch (error) {
    logger.error(`Error al recolectar datos en el cron: ${error.message}`);
  }
});

export default router;
