const { Product } = require("../../db");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name ,price,description,type,quantity} = req.body;

    let product = await Product.findByPk(id);
    if (product) {
       await product.update(
        {
          name: name,
          price: price,
          description: description,
          type: type,
          quantity: quantity,
        },
        {
          where: { id: id },
        }
      )
      product.save();
      res.status(200).send('producto actualizado')
    } else {
      res.status(200).send("Producto no encontrado");
    }
  } catch (error) {
    throw new Error(error + " error al actualizar un producto");
  }
};

module.exports = { updateProduct };
