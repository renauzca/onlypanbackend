const { Product } = require('../../db');
const { Op } = require('sequelize');

const combinedFilters = async (req, res) => {
  let { priceMin, priceMax, type, price } = req.query;
  if (!priceMin) priceMin = '0';
  if (!priceMax) priceMax = '99999';

  try {
    if (priceMin && priceMax && type && price) {
      let product =
        price === 'min'
          ? await Product.findAll({
              where: {
                price: {
                  [Op.between]: [priceMin, priceMax],
                },
                type: {
                  [Op.iLike]: `%${type}%`,
                },
              },
              order: [['price', 'ASC']],
            })
          : await Product.findAll({
              where: {
                price: {
                  [Op.between]: [priceMin, priceMax],
                },
                type: {
                  [Op.iLike]: `%${type}%`,
                },
              },
              order: [['price', 'DESC']],
            });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
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
        order: [['price', 'ASC']],
      });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
    if (priceMin && priceMax && price) {
      let product =
        price === 'min'
          ? await Product.findAll({
              where: {
                price: {
                  [Op.between]: [priceMin, priceMax],
                },
              },
              order: [['price', 'ASC']],
            })
          : await Product.findAll({
              where: {
                price: {
                  [Op.between]: [priceMin, priceMax],
                },
              },
              order: [['price', 'DESC']],
            });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
    if (price && type) {
      let product =
        price === 'min'
          ? await Product.findAll({
              where: {
                type: {
                  [Op.iLike]: `%${type}%`,
                },
              },
              order: [['price', 'ASC']],
            })
          : await Product.findAll({
              where: {
                type: {
                  [Op.iLike]: `%${type}%`,
                },
              },
              order: [['price', 'DESC']],
            });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
    if (price) {
      let product =
        price === 'min'
          ? await Product.findAll({ order: [['price', 'ASC']] })
          : await Product.findAll({ order: [['price', 'DESC']] });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
    if (type) {
      const product = await Product.findAll({
        where: { type: type },
      });

      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
    if (priceMin && priceMax) {
      let product = await Product.findAll({
        where: {
          price: {
            [Op.between]: [priceMin, priceMax],
          },
        },
      });
      const respuesta = product.length ? product : 'ningun producto';
      res.send(respuesta);
      return;
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { combinedFilters };
