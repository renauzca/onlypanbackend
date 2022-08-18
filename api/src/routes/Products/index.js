const { Router } = require('express');
const router = Router();



const getProduct = require("./ShearchProduct")
const postProduct = require("./postProduct")

router.get("/", getProduct.buscar)
router.get("/:id", getProduct.id)
router.post("/", postProduct.crear)



module.exports = router;
