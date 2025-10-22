import express from 'express';
import dotenv from 'dotenv';
import server from './server.js'; // Importar el controlador

dotenv.config(); // Cargar las variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar el uso de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', server); // Pasar el manejo de rutas a server.js

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
