// Función para calcular el Clima_Score
const calculateClimaScore = (weatherAlerts) => {
  return 100 - weatherAlerts.length * 25; // 100 - (número de alertas * 25)
};

// Función para calcular el Cambio_Score
const calculateCambioScore = (exchangeTrend) => {
  return exchangeTrend === 'estable' ? 100 : 50; // 100 si el cambio es estable, 50 si es volátil
};

// Función para calcular el UV_Score
const calculateUVScore = (uvIndex) => {
  if (uvIndex < 6) return 100; // Bajo riesgo
  if (uvIndex >= 6 && uvIndex <= 8) return 75; // Riesgo moderado
  return 50; // Alto riesgo
};

// Función para calcular el IVV
export const calculateIVV = (weatherAlerts, exchangeTrend, uvIndex) => {
  const climaScore = calculateClimaScore(weatherAlerts);
  const cambioScore = calculateCambioScore(exchangeTrend);
  const uvScore = calculateUVScore(uvIndex);

  const ivv = (climaScore * 0.4) + (cambioScore * 0.3) + (uvScore * 0.3);
  return ivv;
};

// Función para determinar el nivel de riesgo basado en el IVV
export const determineRiskLevel = (ivv) => {
  if (ivv >= 80) return 'BAJO'; // Verde
  if (ivv >= 60) return 'MEDIO'; // Amarillo
  if (ivv >= 40) return 'ALTO';  // Naranja
  return 'CRÍTICO'; // Rojo
};
