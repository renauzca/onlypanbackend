const { Router } = require('express');
const router = Router();
const getProduct = require("./buscarProducto")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("product/", getProduct.buscar)

module.exports = router;
