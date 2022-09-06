const { Product } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  crear: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(req.body)
      const product = await Product.findAll({
        where: { name: { [Op.iLike]: "%" + name + "%" } },
      });
      
      if (product.length === 0) {
        res.json(await Product.create(req.body))
      } else {
        res.status(404).send("el nombre ya existe");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
