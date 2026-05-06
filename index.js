require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Conexión a la DB
// Asegúrate de que este archivo exporte el pool si lo necesitas, 
// o simplemente inicialice la conexión.
require("./src/config/db");

// 2. Middlewares globales
app.use(express.json());

// 3. Importación de Routers
const peliculasRouter = require("./src/routes/peliculas");
const authRouter = require("./src/routes/auth");
const estadisticasRoutes = require("./src/routes/estadisticas");
const favoritosRouter = require('./src/routes/favoritos')


// 4. Definición de Rutas
app.use("/api/peliculas", peliculasRouter);
app.use("/api/auth", authRouter);
app.use("/api/estadisticas", estadisticasRoutes); 
app.use('/api/favoritos', favoritosRouter)

// 5. Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ 
    error: `Ruta ${req.method} ${req.url} no encontrada` 
  });
});

// 6. Middleware de errores centralizado
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Si es un error de aplicación (AppError), devuelve el mensaje específico
  if (err.statusCode) {
    return res.status(statusCode).json({
      error: err.message,
    });
  }

  // Si es otro tipo de error, devuelve el mensaje genérico
  console.error("--- ERROR EN EL SERVIDOR ---");
  console.error(err.stack);

  res.status(statusCode).json({
    error: "Algo salió mal en el servidor",
    message: err.message,
    detalles: "Revisa la consola del servidor para más información",
  });
});

// 7. Arranque del servidor (Evitar ejecución en tests)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportamos app para Supertest
module.exports = app;