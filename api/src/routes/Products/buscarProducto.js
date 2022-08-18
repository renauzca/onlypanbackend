const { Product } = require("../../db");

const buscar = async (req, res) => {
  try {
    let { name } = req.query;

    if (name) {
      const query = await Product.findAll();
      console.log()
      let busqueda = query.filter(nombre => nombre.name.toLowerCase().includes(name.toLowerCase()))
      res.send(busqueda);
    } else {
      const allProduct = await Product.findAll();
      res.send(allProduct);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const id = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("No se pudo obtener el producto");
  }
};

module.exports = {
  buscar,
  id,
};
