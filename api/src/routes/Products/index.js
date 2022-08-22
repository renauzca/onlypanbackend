const { Router } = require("express");
const router = Router();

const { id, buscar } = require("./ShearchProduct");
const { deleteProduct } = require("./deleteProduct");
const { filterByType } = require("./filterByType");
const { filterByPrice } = require("./filterByPrice");
const { rangePrice } = require("./rangePrices");
const { crear } = require("./postProduct");
const { updateProduct } = require("./updateProduct");
const { filterbyTypePrice } = require("./filterbyTypePrice");

router.get("/range", rangePrice);
router.get("/price", filterByPrice);
router.get("/type", filterByType);
router.get("/typ", filterbyTypePrice);
router.get("/", buscar);
router.get("/:id", id);
router.post("/", crear);
router.put("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

module.exports = router;
