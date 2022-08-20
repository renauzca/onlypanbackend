const { Router } = require('express');
const router = Router();

const getProduct = require("./ShearchProduct");
const postProduct = require("./postProduct");
const deleteProduct = require("./deleteProduct");
const filterByType = require("./filterByType");
const filterByPrice = require("./filterByPrice");
const updateProduct = require("./updateProduct")

router.get("/price", filterByPrice.filterByPrice)
router.get("/type", filterByType.filterByType)
router.get("/", getProduct.buscar);
router.get("/:id", getProduct.id);
router.post("/", postProduct.crear);
router.put("/delete/:id", deleteProduct.deleteProduct);
router.put("/update/:id", updateProduct.updateProduct);

module.exports = router;
