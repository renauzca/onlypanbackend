const { User, Product, Favorite } = require('../../db');

const favorite = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const newUser = await User.findByPk(userId);
    const idProd = await Product.findByPk(productId);
    await newUser.addProduct(idProd);
    res.status(200).send('relacion creada');
  } catch (error) {
    throw new Error(error + 'No se pudo guardar en favorito el producto');
  }
};

const allFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const all = await User.findOne({
      where: { id: id },
      attributes: ['id'],
      include: [
        {
          model: Product,
          attributes: { exclude: ['favorite'] },
          through: { attributes: [] },
        },
      ],
    });
    if (all.products.length > 0) {
      res.status(200).send(all);
    } else {
      res.status(200).send({ msg: 'No tiene favoritos' });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error + 'Error al mostrar favoritos');
  }
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByPk(id);
    let pro = await Favorite.findOne({
      where: {
        userId: user.id,
        productId: req.body.id,
      },
    });
    if (pro) {
      pro.destroy();
      res.status(200).send('Borrado con exito');
    } else {
      res.status(500).send({
        msg: 'No se encontraron favoritos relacionados con este usuario',
      });
    }
  } catch (error) {
    throw new Error(error + ' error al eliminar un producto de favoritos');
  }
};
module.exports = {
  favorite,
  allFavorite,
  deleteFavorite,
};
