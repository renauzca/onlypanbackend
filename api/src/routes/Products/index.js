const { Router } = require("express");
const router = Router();

const { id, buscar, todos } = require("./searchProduct");
const { deleteProduct } = require("./deleteProduct");
const { filterByType } = require("./filterByType");
const { filterByPrice } = require("./filterByPrice");
const { rangePrice } = require("./rangePrices");
const { crear } = require("./postProduct");
const { updateProduct } = require("./updateProduct");
const { filterbyTypePrice } = require("./filterbyTypePrice");
const { combinedFilters } = require("./combinedFilters");
const { middADM } = require("./middAdm");
const {recycle, addProduct} = require("./recycleProduct")

router.get("/recycle", recycle)
router.get("/addProduct/:id", addProduct)
router.get("/combined", combinedFilters);
router.get("/range", rangePrice);
router.get("/price", filterByPrice);
router.get("/type", filterByType);
router.get("/typ", filterbyTypePrice);
router.get("/query", buscar);
router.get("/", todos);
router.get("/:id", id);
router.post("/",middADM, crear);
router.get("/delete/:id",middADM, deleteProduct);
router.put("/update/:id",middADM, updateProduct);

module.exports = router;
