const { Product } = require("../../db");

const filterByType = async (req, res) => {
  const { name } = req.query;
  try {
    const allProducts = await Product.findAll({
      where: { type: name },
    });

    allProducts.length
      ? res.status(200).send(allProducts)
      : res.status(200).send("No se encontraron productos con este tipo");
  } catch (error) {
    throw new Error(error + " error al momento de filtrar por tipo");
  }
};

module.exports = { filterByType };
