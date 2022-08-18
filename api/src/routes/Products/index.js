const { Router } = require('express');



const router = Router();



const getProduct = require("./buscarProducto")
const postProduct = require("./postProduct")



router.get("/", getProduct.buscar)

module.exports = router;
