const nock = require('nock');
const { getWeatherData, getExchangeData, getTimeData } = require('../src/index');
const cron = require('node-cron');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

describe('Pruebas de integración con APIs', () => {

  test('Debería obtener datos de clima de Open-Meteo correctamente', async () => {
    // Simular respuesta de Open-Meteo para Nueva York
    nock('https://api.open-meteo.com')
      .get('/v1/forecast')
      .query({ latitude: 40.7128, longitude: -74.0060, current: 'temperature_2m,wind_speed_10m', hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index' })
      .reply(200, {
        current: { temperature_2m: 18 },
        hourly: {
          precipitation: [10],
          wind_speed_10m: [15],
          uv_index: [5],
          temperature_2m: [18, 20, 22]
        }
      });

    const data = await getWeatherData(40.7128, -74.0060);
    expect(data.current.temperature_2m).toBe(18);
    expect(data.hourly.precipitation[0]).toBe(10);
  });

  test('Debería obtener el tipo de cambio de USD correctamente', async () => {
    // Simular respuesta de ExchangeRate
    nock('https://api.exchangerate-api.com')
      .get('/v4/latest/USD')
      .reply(200, {
        rates: {
          EUR: 0.85,
          GBP: 0.75
        }
      });

    const data = await getExchangeData();
    expect(data).toBe(0.85); // Se espera el tipo de cambio de EUR
  });

  test('Debería obtener la hora local de una ciudad correctamente', async () => {
    // Simular respuesta de WorldTimeAPI
    nock('http://worldtimeapi.org')
      .get('/api/timezone/America/New_York')
      .reply(200, {
        datetime: '2025-10-20T16:00:00',
        timezone: 'America/New_York'
      });

    const data = await getTimeData('America/New_York');
    expect(data).toBe('2025-10-20T16:00:00');
  });

  test('Debería ejecutar el cron job cada 30 minutos', async () => {
    const cronJob = cron.schedule('*/30 * * * *', () => {
      logger.info('Cron job ejecutado');
    });

    // Simulamos la ejecución del cron job
    jest.useFakeTimers();
    jest.advanceTimersByTime(1800000); // 30 minutos
    cronJob.stop();
    expect(logger.info).toHaveBeenCalledWith('Cron job ejecutado');
  });
});
