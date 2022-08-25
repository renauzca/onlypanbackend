const { Product } = require("../../db");
const { Op } = require("sequelize");

const rangePrice = async (req, res) => {
  const { priceMin, priceMax } = req.query;
  try {
    let product = await Product.findAll({
      where: {
        price: {
          [Op.between]: [priceMin, priceMax],
        },
      },
      order: [["price", "ASC"]],
    });
    res.send(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { rangePrice };
