const { Product } = require("../../db");
const { Op } = require("sequelize");

const filterbyTypePrice = async (req, res) => {
  const { price, type } = req.query;
  try {
    let product =
      price === "min"
        ? await Product.findAll({
            where: {
              type: {
                [Op.iLike]: "%" + type + "%",
              },
            },
            order: [["price", "ASC"]],
          })
        : await Product.findAll({
            where: {
              type: {
                [Op.iLike]: "%" + type + "%",
              },
            },
            order: [["price", "DESC"]],
          });
    res.send(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { filterbyTypePrice };
