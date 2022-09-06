const { Product } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  crear: async (req, res) => {
    try {
      const { name, price, image, description, type, quantity } = req.body;
      const product = await Product.findAll({
        where: { name: { [Op.iLike]: "%" + name + "%" } },
      });
      //console.log(product[0].dataValues.isAvailable);
      if (!product[0].dataValues.isAvailable){
        await Product.update({
          name,
          price,
          image,
          description,
          type,
          quantity,
          isAvailable:true
        },{
          where:{id:product[0].dataValues.id}
        })
        return res.status(200).send('producto "creado"')
      }else if (product.length === 0) {
        res.json(await Product.create({
          name,
          price,
          image,
          description,
          quantity,
          type,
        }))
      } else {
        res.status(404).send("el nombre ya existe");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
