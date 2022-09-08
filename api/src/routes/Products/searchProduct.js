const { Product } = require("../../db");
const { Op } = require("sequelize");

const buscar = async (req, res) => {
  try {
    let { name } = req.query;

    const query = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
        isAvailable:true
      },
    });

    if (query.length === 0) {
      res.status(404).send("no se encontro el producto");
    } else {
      res.send(query);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const todos = async (req, res) => {
  try {
    const allProduct = await Product.findAll({ order: [["name", "ASC"]] });
    res.send(allProduct);
  } catch (error) {
    res.status(404).send("error al llamar a los productos");
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
  todos,
};
