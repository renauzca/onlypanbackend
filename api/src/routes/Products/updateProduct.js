const { Product } = require("../../db");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (product) {
       await product.update(req.body)
      res.status(200).send('producto actualizado')
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error + " error al actualizar un producto");
  }
};

module.exports = { updateProduct };
