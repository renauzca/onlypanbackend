const { Router } = require('express');



const router = Router();



const getProduct = require("./ShearchProduct")
const postProduct = require("./postProduct")



router.get("/", getProduct.buscar)

module.exports = router;
