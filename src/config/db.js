// src/config/db.js
const { Pool } = require("pg");

// La forma correcta de usar el .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar a PostgreSQL:", err.message);
    process.exit(1);
  }
  release();
  console.log("Conectado a PostgreSQL - Base de datos:", process.env.DB_NAME);
});

module.exports = pool;
