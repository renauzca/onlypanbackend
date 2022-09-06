const { Product } = require("../../db");
//
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (product) {
      product.destroy();
      res.status(200).send("Producto eliminado");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(400).send(error + "Problemas al borrar el producto");
  }
};

module.exports = { deleteProduct };
