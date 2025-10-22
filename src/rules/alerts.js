// Función para verificar si se debe activar una alerta climática
export const checkWeatherAlert = (temperature, precipitation, windSpeed) => {
  let alerts = [];

  // Alerta de temperatura extrema
  if (temperature > 35 || temperature < 0) {
    alerts.push('Temperatura extrema');
  }

  // Alerta de probabilidad de precipitación alta
  if (precipitation > 70) {
    alerts.push(`Alta probabilidad de lluvia (${precipitation}%)`);
  }

  // Alerta de velocidad del viento alta
  if (windSpeed > 50) {
    alerts.push(`Viento fuerte (${windSpeed} km/h)`);
  }

  return alerts;
};
