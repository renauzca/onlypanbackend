const { Product } = require("../../db");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (product) {
       const {name, description, price ,quantity ,image} = req.body
      await product.update({
        name: name,
        description: description,
        price: price,
        quantity: product.quantity + quantity,
        image: image
       })
       
      res.status(200).send('producto actualizado')
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateProduct };
