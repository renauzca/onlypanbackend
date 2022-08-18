const { Router } = require('express');
const router = Router();
const postProduct = require("./postProduct")




const getProduct = require("./buscarProducto")


router.get("/", getProduct.buscar)
router.get("/:id", getProduct.id)
router.post("/", postProduct.crear)


module.exports = router;
