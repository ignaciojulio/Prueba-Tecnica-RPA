import winston from 'winston';

// Configuración de logger utilizando winston
export const logger = winston.createLogger({
  level: 'info', // El nivel de log predeterminado (puede ser 'info', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(), // Añadir timestamp a los logs
    winston.format.json() // Formato de log en JSON
  ),
  transports: [
    // Transportes para almacenar los logs
    new winston.transports.Console({ format: winston.format.simple() }), // Imprimir en consola
    new winston.transports.File({ filename: 'logs/exec/exec.log', level: 'info' }), // Guardar logs de ejecución
    new winston.transports.File({ filename: 'logs/errors/errors.log', level: 'error' }) // Guardar logs de errores
  ]
});

// Funciones de log específicas para mayor claridad
export const logError = (message) => {
  logger.error(message);
};

export const logInfo = (message) => {
  logger.info(message);
};

export const logWarn = (message) => {
  logger.warn(message);
};
