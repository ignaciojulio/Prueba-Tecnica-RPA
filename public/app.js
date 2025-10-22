fetch('/data')
  .then(response => response.json())
  .then(data => {
    console.log('Datos de las ciudades:', data);
    // Aquí actualizarías los gráficos y las alertas con los datos obtenidos
  })
  .catch(error => console.error('Error al obtener los datos:', error));
