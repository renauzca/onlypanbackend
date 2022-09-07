const { Cart, User, Product, ProductCart } = require('../../db');

const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const userCart = await Cart.findAll({
      where: { userId: id },
      include: {
        model: Product,
        through: { attributes: ['quantity', 'totalPrice'] },
      },
    });
    res.send(userCart);
  } catch (error) {
    throw new Error(error + ' Error al obtener el cart');
  }
};

const createCart = async (req, res) => {
  try {
    const { id } = req.params;
    const findUserCart = await Cart.findOne({ where: { userId: id } });
    if (!findUserCart) {
      const newCart = await Cart.create();
      const user = await User.findByPk(id);
      await newCart.setUser(user);
      if (req.body.length) {
        req.body.forEach(async (pro) => {
          await Product.findByPk(pro.id).then((response) =>
            newCart.addProduct(response, {
              through: {
                quantity: pro.quantitySelectedCartSh,
                totalPrice: pro.quantitySelectedCartSh * pro.price,
              },
            })
          );
        });
      }
      res.send('carrito creado');
    } else res.status(200).send('El usuario ya tiene un carrito');
  } catch (error) {
    res.status(500).send(error+ 'error al crear el carrito')
    
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findOne({ where: { userId: id } }).then(async (cart) => {
      let pro = await ProductCart.findOne({
        where: {
          cartId: cart.dataValues.id,
          productId: req.body.id,
        },
      });

      if (pro) {
        await pro.update({
          quantity: req.body.quantity,
          totalPrice: req.body.totalPrice,
        });
        pro.save();
        res.status(200).send('Producto Modificado');
      } else {
        await Product.findByPk(req.body.id).then((response) =>
          cart.addProduct(response, {
            through: {
              quantity: req.body.quantity,
              totalPrice: req.body.totalPrice,
            },
          })
        );
        res.status(200).send('Producto agregado');
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(error + ' Error al cambiar datos del carrito');
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    let cart = await Cart.findOne({ where: { userId: id } });
    if (cart) {
      await cart.destroy({ where: { userId: id } });
      res.status(200).send('Borrado con exito');
    } else {
      res.status(500).send('No se encontro un usuario con ese ID');
    }
  } catch (error) {
    throw new Error(error + ' error al eliminar');
  }
};

const deleteCartPro = async (req, res) => {
  const { id } = req.params;
  try {
    let cart = await Cart.findOne({ where: { userId: id } });
    let pro = await ProductCart.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.id,
      },
    });
    if (pro) {
      pro.destroy();
      res.status(200).send('Borrado con exito');
    } else {
      res.status(500).send('No se encontro un producto con ese ID');
    }
  } catch (error) {
    console.log(error);
    throw new Error(error + ' error al eliminar un producto');
  }
};

module.exports = {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteCartPro,
};
