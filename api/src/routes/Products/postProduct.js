const { Product } = require('../../db');
const { Op } = require('sequelize');

module.exports = {
  crear: async (req, res) => {
    try {
      const { name, price, image, description, type, quantity } = req.body;
      console.log(req.body)
      const product = await Product.findAll({
        where: { name: { [Op.iLike]: "%" + name + "%" },isAvailable: true },
        
      });
      if (product.length === 0 ) {
        res.json(
          await Product.create({
            name,
            price,
            image,
            description,
            quantity,
            type,
          })
        );
      } else {
        res.status(404).send('el nombre ya existe');
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
