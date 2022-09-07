const { Order, Product } = require('../../db');

async function updateOrderStatus(req, res, next) {
  try {
      const { id } = req.params;
    let orders = await Order.findByPk(id);
      await orders.update({status:'entregado'})
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

module.exports = { updateOrderStatus };
