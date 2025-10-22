// Función para calcular el Clima_Score
const calculateClimaScore = (weatherAlerts) => {
  return 100 - weatherAlerts.length * 25;
};

// Función para calcular el Cambio_Score
const calculateCambioScore = (exchangeTrend) => {
  return exchangeTrend === 'estable' ? 100 : 50;
};

// Función para calcular el UV_Score
const calculateUVScore = (uvIndex) => {
  if (uvIndex < 6) return 100;
  if (uvIndex >= 6 && uvIndex <= 8) return 75;
  return 50;
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
  if (ivv >= 80) return 'BAJO';
  if (ivv >= 60) return 'MEDIO';
  if (ivv >= 40) return 'ALTO';
  return 'CRÍTICO';
};
