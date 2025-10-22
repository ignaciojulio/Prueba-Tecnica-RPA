import nock from 'nock'; // Para interceptar peticiones HTTP

// Configuración de nock para limpiar los mocks antes de cada prueba
beforeEach(() => {
  nock.cleanAll(); // Limpiar todos los mocks de nock antes de cada prueba
});

// Configuración global antes de todas las pruebas
beforeAll(() => {
  // Puedes agregar cualquier configuración global que necesites, como la configuración de Jest
  console.log('Configuración inicial para las pruebas');
});
