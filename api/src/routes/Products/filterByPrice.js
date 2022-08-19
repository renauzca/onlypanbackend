const { Product } = require("../../db");

const filterByPrice = async (req, res) => {
  const { name } = req.query;
  try {
    let productSort =
      name === "min"
        ? await Product.findAll({order: [["price", "ASC"]]})
        : await Product.findAll({order: [["price", "DESC"]]});
    res.send(productSort);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { filterByPrice };
