import { fileURLToPath } from 'url'; // Importar la función para convertir la URL en una ruta
import path from 'path';
import fs from 'fs'; // Importar el módulo fs para manejar archivos

// Obtener el directorio actual (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url); // Obtener la URL actual
const __dirname = path.dirname(__filename); // Convertir la URL en un path

// Ruta de las carpetas de datos, ahora apuntando a la raíz del proyecto
const rawDataPath = path.join(__dirname, '../../data/raw'); // Ahora apunta a la raíz
const processedDataPath = path.join(__dirname, '../../data/processed'); // Ahora apunta a la raíz

// Logs para verificar las rutas
console.log(`Ruta de datos crudos: ${rawDataPath}`);
console.log(`Ruta de datos procesados: ${processedDataPath}`);

// Función para guardar los datos crudos (raw)
export const saveRawData = async (data, filename) => {
  const filePath = path.join(rawDataPath, filename);
  
  try {
    console.log(`Guardando datos crudos en: ${filePath}`);

    // Crear la carpeta 'raw' si no existe
    if (!fs.existsSync(rawDataPath)) {
      fs.mkdirSync(rawDataPath, { recursive: true });
      console.log('Carpeta "raw" creada');
    } else {
      console.log('La carpeta "raw" ya existe');
    }

    // Guardar los datos crudos en un archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Datos crudos guardados en ${filePath}`);
  } catch (error) {
    console.error(`Error al guardar los datos crudos: ${error.message}`);
  }
};

// Función para guardar los datos procesados
export const saveProcessedData = async (data, filename) => {
  const filePath = path.join(processedDataPath, filename);

  try {
    console.log(`Guardando datos procesados en: ${filePath}`);

    // Crear la carpeta 'processed' si no existe
    if (!fs.existsSync(processedDataPath)) {
      fs.mkdirSync(processedDataPath, { recursive: true });
      console.log('Carpeta "processed" creada');
    } else {
      console.log('La carpeta "processed" ya existe');
    }

    // Guardar los datos procesados en un archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Datos procesados guardados en ${filePath}`);
  } catch (error) {
    console.error(`Error al guardar los datos procesados: ${error.message}`);
  }
};
