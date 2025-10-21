// Función para calcular Clima_Score
function calcularClimaScore(alertasClimaticas) {
  let climaScore = 100 - (alertasClimaticas * 25);
  return climaScore < 0 ? 0 : climaScore;  // Aseguramos que el score no sea negativo.
}

// Función para calcular Cambio_Score
function calcularCambioScore(variacionDiaria) {
  if (variacionDiaria > 3) {
    return 50; // Alerta crítica por gran cambio
  }
  return 100; // Estable
}

// Función para calcular UV_Score
function calcularUVScore(uv) {
  if (uv < 6) {
    return 100;
  } else if (uv >= 6 && uv <= 8) {
    return 75;
  }
  return 50;
}

// Función para calcular IVV Final
function calcularIVV(climaScore, cambioScore, uvScore) {
  const ivv = (climaScore * 0.4) + (cambioScore * 0.3) + (uvScore * 0.3);
  return ivv;
}

// Exportar las funciones
module.exports = {
  calcularClimaScore,
  calcularCambioScore,
  calcularUVScore,
  calcularIVV
};
