import dotenv from 'dotenv';
import express from 'express';
import { logger } from './lib/logger.js'; // Para los logs
import { collectCityData } from './lib/dataCollector.js'; // Función centralizada para recolectar datos
import { saveRawData, saveProcessedData } from './lib/dataStorage.js'; // Funciones para guardar datos
import cities from './config/cities.js'; // Importar ciudades
import cron from 'node-cron'; // Para la automatización
import { calculateIVV, determineRiskLevel } from './rules/ivv.js'; // Asegúrate de importar calculateIVV desde ivv.js

dotenv.config();
const router = express.Router();

// Ruta para obtener los datos de las APIs
router.get('/data', async (req, res) => {
  try {
    logger.info('Iniciando la recolección de datos...');

    // Usamos la nueva función centralizada para recolectar los datos
    const cityData = await collectCityData(cities);

    // Guardar los datos crudos (raw) en la carpeta 'raw'
    await saveRawData(cityData, 'cityData_raw.json');

    // Procesar los datos (por ejemplo, calcular IVV y niveles de riesgo)
    const processedData = cityData.map(city => {
      // Procesamiento de datos (calcular IVV, determinar el nivel de riesgo, etc.)
      return {
        ...city,
        ivv: calculateIVV(city.weather, city.exchange, city.time), // Ejemplo de cálculo de IVV
        riskLevel: determineRiskLevel(city.ivv) // Determinar el nivel de riesgo
      };
    });

    // Guardar los datos procesados en la carpeta 'processed'
    await saveProcessedData(processedData, 'cityData_processed.json');

    logger.info('Datos recolectados y guardados exitosamente.');

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

    // Guardar los datos crudos (raw) en la carpeta 'raw'
    await saveRawData(cityData, 'cityData_raw.json');

    // Procesar los datos (calcular IVV, determinar el nivel de riesgo, etc.)
    const processedData = cityData.map(city => {
      return {
        ...city,
        ivv: calculateIVV(city.weather, city.exchange, city.time),
        riskLevel: determineRiskLevel(city.ivv)
      };
    });

    // Guardar los datos procesados en la carpeta 'processed'
    await saveProcessedData(processedData, 'cityData_processed.json');

    logger.info('Datos recolectados correctamente:');

  } catch (error) {
    logger.error(`Error al recolectar datos en el cron: ${error.message}`);
  }
});

export default router;
