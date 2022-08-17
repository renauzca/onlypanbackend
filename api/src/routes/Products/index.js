const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getProducts} = require('./getProducts')




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', getProducts);


module.exports = router;
