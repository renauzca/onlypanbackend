const { Router } = require('express');
const router = Router();

const getProduct = require("./ShearchProduct");
const postProduct = require("./postProduct");
const deleteProduct = require("./deleteProduct");

router.get("/", getProduct.buscar);
router.get("/:id", getProduct.id);
router.post("/", postProduct.crear);
router.delete("/:id", deleteProduct.deleteProduct);

module.exports = router;
