import express from 'express';
import dotenv from 'dotenv';
import server from './server.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar el uso de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', server);

app.get('/', server);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
