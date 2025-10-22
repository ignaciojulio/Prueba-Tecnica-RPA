import dotenv from 'dotenv';
import axios from 'axios';
import axiosRetry from 'axios-retry';

dotenv.config();  
// Crear una instancia de axios
const axiosInstance = axios.create({
  timeout: process.env.TIMEOUT,
});

// Configurar axios con reintentos exponenciales
axiosRetry(axiosInstance, {
  retries: process.env.RETRIES,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.code === 'ECONNRESET' || !error.response;
  },
});

// Función para realizar las solicitudes HTTP con reintentos y timeout
const makeHttpRequest = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.error('Error de conexión: Reintentando...');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout excedido: Reintentando...');
    } else {
      console.error(`Error al hacer la solicitud: ${error.message}`);
    }
    throw error;
  }
};

export { makeHttpRequest };
