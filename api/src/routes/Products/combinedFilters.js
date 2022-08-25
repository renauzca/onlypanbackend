const { Product } = require("../../db");
const { Op } = require("sequelize");

const combinedFilters = async (req, res) => {
  const { priceMin, priceMax, type, name } = req.query;
  try {
    if (priceMin && priceMax && type && name) {
      let product = await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceMin, priceMax],
          },
          type: {
            [Op.iLike]: `%${type}%`,
          },
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        order: [["price", "ASC"]],
      });
      res.send(product);
      return;
    }
    if (priceMin && priceMax && type) {
      let product = await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceMin, priceMax],
          },
          type: {
            [Op.iLike]: `%${type}%`,
          },
        },
        order: [["price", "ASC"]],
      });
      res.send(product);
      return;
    }
    if (priceMin && priceMax && name) {
      let product = await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceMin, priceMax],
          },
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        order: [["price", "ASC"]],
      });
    }
    if (name && type) {
      let product = await Product.findAll({
        where: {
          type: {
            [Op.iLike]: `%${type}%`,
          },
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        order: [["price", "ASC"]],
      });
      res.send(product);
      return;
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { combinedFilters };
