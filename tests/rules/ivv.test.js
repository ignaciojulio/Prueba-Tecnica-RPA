import { calculateIVV, determineRiskLevel } from '../../src/rules/ivv.js'; // Importar las funciones de cálculo de IVV

// Test de cálculo de IVV
describe('calculateIVV', () => {
  it('debe calcular correctamente el IVV con los datos proporcionados', () => {
    const weatherAlerts = ['Temperatura extrema']; // Ejemplo de alerta por temperatura
    const exchangeTrend = 'estable'; // Tipo de cambio estable
    const uvIndex = 4; // Bajo índice UV

    const ivv = calculateIVV(weatherAlerts, exchangeTrend, uvIndex);
    expect(ivv).toBe(90); // Cálculo esperado basado en las ponderaciones (Clima_Score * 0.4 + Cambio_Score * 0.3 + UV_Score * 0.3)
  });
});

// Test de determinación del nivel de riesgo
describe('determineRiskLevel', () => {
  it('debe devolver el nivel de riesgo adecuado según el IVV', () => {
    const ivv = 90;
    const riskLevel = determineRiskLevel(ivv);
    expect(riskLevel).toBe('BAJO'); // IVV >= 80 => Riesgo bajo
  });
});
