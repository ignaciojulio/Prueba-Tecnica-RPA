import winston from 'winston';

// Configuración de logger utilizando winston
export const logger = winston.createLogger({
  level: 'info', // El nivel de log predeterminado (puede ser 'info', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Transportes para almacenar los logs
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/exec/exec.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/errors/errors.log', level: 'error' })
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
