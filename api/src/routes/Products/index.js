const { Router } = require('express');
const router = Router();

const getProduct = require("./ShearchProduct");
const postProduct = require("./postProduct");
const deleteProduct = require("./deleteProduct");
const filterByType = require("./filterByType");

router.get("/type", filterByType.filterByType)
router.get("/", getProduct.buscar);
router.get("/:id", getProduct.id);
router.post("/", postProduct.crear);
router.delete("/:id", deleteProduct.deleteProduct);

module.exports = router;
