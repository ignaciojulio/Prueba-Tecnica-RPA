import { makeHttpRequest } from '../lib/http.js'; // Importar la función para hacer peticiones HTTP

// Función para obtener el tipo de cambio USD a la moneda local
export const getExchangeData = async (currency) => {
  const url = `https://api.exchangerate-api.com/v4/latest/USD`;
  const data = await makeHttpRequest(url);

  // Convertir el tipo de cambio de USD a la moneda local
  const exchangeRate = data.rates[currency];
  const variation = (exchangeRate - 1) * 100;
  const trend = variation < 2 ? 'estable' : 'volátil';

  return {
    exchangeRate,
    variation,
    trend
  };
};
