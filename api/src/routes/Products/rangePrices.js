const { Product } = require('../../db');
const { Op } = require('sequelize');

const rangePrice = async (req, res) => {
  let { priceMin, priceMax } = req.query;
  priceMin = !priceMin ? 0 : priceMin;
  priceMax = !priceMax ? 9999 : priceMax;
  try {
    let product = await Product.findAll({
      where: {
        price: {
          [Op.between]: [priceMin, priceMax],
        },
      },
    });
    res.send(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { rangePrice };
