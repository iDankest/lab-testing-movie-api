const pool = require("../config/db"); // O como llames a tu conexión de base de datos

const estadisticasDirectores = async (req, res) => {
    // Aquí irá tu lógica de SQL para sacar las estadísticas
    res.json({ msg: "Aquí irán los directores" });
};

const estadisticasGeneros = async (req, res) => {
    // Aquí tu lógica SQL
    res.json({ msg: "Aquí irán los géneros" });
};

module.exports = {
    estadisticasDirectores,
    estadisticasGeneros
};