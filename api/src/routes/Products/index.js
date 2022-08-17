const { Router } = require('express');
const router = Router();





const getProduct = require("./buscarProducto")


router.get("/", getProduct.buscar)


module.exports = router;
