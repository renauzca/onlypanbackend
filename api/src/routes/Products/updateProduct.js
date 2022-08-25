const { Product } = require("../../db");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findByPk(id);
    if (product) {
      product.set(req.body);
      product.save();
      res.status(200).send(product);
    } else {
      res.status(200).send("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error + " error al actualizar un producto");
  }
};

module.exports = { updateProduct };
