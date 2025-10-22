import { collectCityData } from '../lib/dataCollector.js'; // Importar la función centralizada
import { logger } from '../lib/logger.js'; // Para los logs
import cities from '../config/cities.js'; // Importar ciudades

const runOnce = async () => {
  try {
    logger.info('Iniciando la recolección de datos...');

    // Usamos la nueva función centralizada para recolectar los datos
    const cityData = await collectCityData(cities);
    logger.info('Datos recolectados exitosamente.');

    console.log(cityData);  // Imprimir los datos recolectados

  } catch (error) {
    logger.error(`Error al recolectar datos: ${error.message}`);
  }
};

runOnce();
