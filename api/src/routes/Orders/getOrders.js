const { Order, Product } = require('../../db');

async function getOrders(req, res, next) {
  try {
    const { userId } = req.query;
    const user = userId ? { where: { userId } } : {};
    let orders = await Order.findAll({
      ...user,
      attributes: ['id','totalPrice', 'createdAt', 'delivery', 'status'],
      include: {
        model: Product,
        attributes: ['name'],
        through: { attributes: ['quantity'] },
      },
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

module.exports = { getOrders };
