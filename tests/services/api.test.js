import { getWeatherData } from '../../src/services/weather.js';
import { getExchangeData } from '../../src/services/fx.js';
import { getTimeData } from '../../src/services/time.js';
import nock from 'nock'; // Para interceptar las peticiones HTTP

// Test de la función getWeatherData
describe('getWeatherData', () => {
  it('debe obtener datos climáticos de la API de Open-Meteo', async () => {
    const lat = 40.7128;
    const lon = -74.0060;

    // Simular la respuesta de la API de Open-Meteo
    nock('https://api.open-meteo.com')
      .get('/v1/forecast')
      .query({
        latitude: 40.7128,
        longitude: -74.0060,
        current: 'temperature_2m,wind_speed_10m',
        hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index'
      })
      .reply(200, {
        current: {
          temperature_2m: 22,
          wind_speed_10m: 10,
          precipitation: 0,
          uv_index: 5
        },
        hourly: [{ temperature_2m: 20 }]
      });

    const weatherData = await getWeatherData(lat, lon);
    expect(weatherData.current.temperature_2m).toBe(22);
    expect(weatherData.current.wind_speed_10m).toBe(10);
  });
});

// Test de la función getExchangeData
describe('getExchangeData', () => {
  it('debe obtener el tipo de cambio desde la API de ExchangeRate-API', async () => {
    const currency = 'EUR';

    // Simular la respuesta de la API de ExchangeRate-API
    nock('https://api.exchangerate-api.com')
      .get('/v4/latest/USD')
      .reply(200, {
        rates: {
          EUR: 0.85,
        },
      });

    const exchangeData = await getExchangeData(currency);
    expect(exchangeData.exchangeRate).toBe(0.85);
    expect(exchangeData.trend).toBe('estable');
  });
});

// Test de la función getTimeData
describe('getTimeData', () => {
  it('debe obtener la hora local y la diferencia horaria desde la API de WorldTimeAPI', async () => {
    const timezone = 'Europe/London';

    // Simular la respuesta de la API de WorldTimeAPI
    nock('https://worldtimeapi.org')
      .get('/api/timezone/Europe/London')
      .reply(200, {
        datetime: '2025-10-21T10:30:00Z',
        utc_offset: 1,
      });

    nock('https://worldtimeapi.org')
      .get('/api/timezone/America/Bogota')
      .reply(200, {
        datetime: '2025-10-21T05:30:00Z',
        utc_offset: -5,
      });

    const timeData = await getTimeData(timezone);
    expect(timeData.localTime).toBe('2025-10-21T10:30:00Z');
    expect(timeData.timeDifference).toBe(6); // Diferencia horaria de Londres y Bogotá
  });
});
