const { Router } = require("express");
const router = Router();
const { Product } = require("../db");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});

module.exports = router;
