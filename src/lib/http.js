import axios from 'axios';
import axiosRetry from 'axios-retry';

// Crear una instancia de axios
const axiosInstance = axios.create({
  timeout: 10000, // 10 segundos de timeout máximo
});

// Configurar axios con reintentos exponenciales
axiosRetry(axiosInstance, {
  retries: 5,  // Número máximo de reintentos
  retryDelay: axiosRetry.exponentialDelay,  // Retraso exponencial entre los intentos
  retryCondition: (error) => {
    // Condición para reintentar (si es un error de red como ECONNRESET)
    return error.code === 'ECONNRESET' || !error.response; // ERROR de desconexión o error sin respuesta
  },
});

// Función para realizar las solicitudes HTTP con reintentos y timeout
const makeHttpRequest = async (url) => {
  try {
    const response = await axiosInstance.get(url);  // Realizar la solicitud con reintentos
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.error('Error de conexión: Reintentando...');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout excedido: Reintentando...');
    } else {
      console.error(`Error al hacer la solicitud: ${error.message}`);
    }
    throw error; // Relanzar el error después de varios intentos
  }
};

export { makeHttpRequest };
