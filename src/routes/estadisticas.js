const { Router } = require("express");
const router = Router();
// Importamos los controladores (que tendrás que crear luego)
const { estadisticasDirectores, estadisticasGeneros } = require("../controllers/estadisticasController");

router.get('/directores', estadisticasDirectores);
router.get('/generos', estadisticasGeneros);

module.exports = router;