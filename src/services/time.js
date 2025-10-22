import { makeHttpRequest } from '../lib/http.js'; // Importar la función para hacer peticiones HTTP

// Función para calcular la diferencia horaria entre la ciudad y Bogotá
const calculateTimeDifference = (cityUtcOffset, bogotaUtcOffset) => {
  // Función para convertir el formato `+hh:mm` o `-hh:mm` a minutos
  const parseUtcOffset = (offset) => {
    const [hours, minutes] = offset.split(':').map(Number); // Convertir horas y minutos a números
    return (hours * 60) + minutes; // Convertir a minutos
  };

  const cityOffsetInMinutes = parseUtcOffset(cityUtcOffset);
  const bogotaOffsetInMinutes = parseUtcOffset(bogotaUtcOffset);

  // La diferencia es la diferencia entre los minutos de los offsets
  return (cityOffsetInMinutes - bogotaOffsetInMinutes) / 60; // Convertir a horas
};

// Función para obtener la hora local de una ciudad y calcular la diferencia horaria con Bogotá
export const getTimeData = async (timezone) => {
  const url = `https://worldtimeapi.org/api/timezone/${timezone}`;
  const data = await makeHttpRequest(url);  // Obtener la hora y el offset de la ciudad solicitada

  // Obtener la hora de Bogotá para comparar la diferencia
  const bogotaTime = await makeHttpRequest('https://worldtimeapi.org/api/timezone/America/Bogota');
  
  // Calcular la diferencia horaria
  const timeDifference = calculateTimeDifference(data.utc_offset, bogotaTime.utc_offset); // Calcular la diferencia en horas
  
  // Retornar la hora local y la diferencia horaria calculada
  return {
    localTime: data.datetime,  // Hora local de la ciudad
    timeDifference: timeDifference // Diferencia horaria calculada
  };
};
