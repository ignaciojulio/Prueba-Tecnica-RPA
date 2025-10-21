const { calcularClimaScore, calcularCambioScore, calcularUVScore, calcularIVV } = require('../src/rules/ivv');

describe('Reglas de negocio: Cálculo de scores', () => {

  test('Clima_Score debe calcular correctamente según las alertas', () => {
    const alertaClima = 1; // 1 alerta por lluvia > 70%
    const score = calcularClimaScore(alertaClima);
    expect(score).toBe(75); // 100 - (1 * 25) = 75
  });

  test('Cambio_Score debe ser 50 si la variación es mayor a 3%', () => {
    const variacionDiaria = 4; // Variación mayor a 3%
    const score = calcularCambioScore(variacionDiaria);
    expect(score).toBe(50);
  });

  test('Cambio_Score debe ser 100 si la variación es exactamente 3%', () => {
    const variacionDiaria = 3; // Variación exactamente 3%
    const score = calcularCambioScore(variacionDiaria);
    expect(score).toBe(100); // Estable, no alerta
  });

  test('Cambio_Score debe ser 100 si la variación es menor a 3%', () => {
    const variacionDiaria = 2; // Variación menor a 3%
    const score = calcularCambioScore(variacionDiaria);
    expect(score).toBe(100);
  });

  test('UV_Score debe ser 100 si el índice UV es menor que 6', () => {
    const uv = 5;
    const score = calcularUVScore(uv);
    expect(score).toBe(100);
  });

  test('UV_Score debe ser 75 si el índice UV está entre 6 y 8', () => {
    const uv = 7;
    const score = calcularUVScore(uv);
    expect(score).toBe(75);
  });

  test('UV_Score debe ser 50 si el índice UV es mayor que 8', () => {
    const uv = 9;
    const score = calcularUVScore(uv);
    expect(score).toBe(50);
  });

  test('IVV debe calcularse correctamente usando los scores', () => {
    const climaScore = 75;
    const cambioScore = 100;
    const uvScore = 100;
    const ivv = calcularIVV(climaScore, cambioScore, uvScore);
    expect(ivv).toBe(90); // (75 * 0.4) + (100 * 0.3) + (100 * 0.3) = 90
  });

  test('IVV debe ser 100 si todos los scores son 100', () => {
    const climaScore = 100;
    const cambioScore = 100;
    const uvScore = 100;
    const ivv = calcularIVV(climaScore, cambioScore, uvScore);
    expect(ivv).toBe(100); // (100 * 0.4) + (100 * 0.3) + (100 * 0.3) = 100
  });
});
