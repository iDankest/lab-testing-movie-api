// src/config/db.js
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_NAME
    : process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar a PostgreSQL:", err.message);
    process.exit(1);
  }
  release();
  console.log("Conectado a PostgreSQL - Base de datos:", process.env.DB_NAME);
});

module.exports = pool;
