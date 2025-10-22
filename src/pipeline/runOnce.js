import { collectCityData } from '../lib/dataCollector.js'; // Función centralizada para recolectar datos
import { saveRawData, saveProcessedData } from '../lib/dataStorage.js'; // Funciones para guardar datos
import { logger } from '../lib/logger.js'; // Para los logs
import cities from '../config/cities.js'; // Importar ciudades
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Importar la función para convertir la URL en una ruta

// Obtener el directorio actual (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url); // Obtener la URL actual
const __dirname = path.dirname(__filename); // Convertir la URL en un path

const runOnce = async () => {
  try {
    logger.info('Iniciando la recolección de datos...');

    // Obtener los datos de las ciudades
    const cityData = await collectCityData(cities);

    // Definir las rutas correctas para los archivos en la raíz del proyecto
    const rawFilePath = path.join(__dirname, '../../data/raw', 'cityData_raw.json');
    const processedFilePath = path.join(__dirname, '../../data/processed', 'cityData_processed.json');

    // Guardar los datos crudos (raw) en la carpeta 'raw'
    await saveRawData(cityData, 'cityData_raw.json');

    // Guardar los datos procesados (processed) en la carpeta 'processed'
    await saveProcessedData(cityData, 'cityData_processed.json');

    logger.info('Datos recolectados y guardados exitosamente.');

    // Verificar que los archivos realmente existen
    if (fs.existsSync(rawFilePath)) {
      console.log('El archivo de datos crudos (raw) fue guardado correctamente.');
    } else {
      console.log('Error: El archivo de datos crudos no fue guardado.');
    }

    if (fs.existsSync(processedFilePath)) {
      console.log('El archivo de datos procesados (processed) fue guardado correctamente.');
    } else {
      console.log('Error: El archivo de datos procesados no fue guardado.');
    }

  } catch (error) {
    logger.error(`Error al recolectar y guardar los datos: ${error.message}`);
  }
};

runOnce();
