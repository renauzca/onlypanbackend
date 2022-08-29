const Stripe = require('stripe');
// const cors = require('cors');
// const express = require('express');
const { Order, User, Product } = require('../../db');
const stripe = new Stripe(
  'sk_test_51LaJmxF13fYbs0Bsyd7oDYOhUbc6PCcf21MN9NsApSzpBZm2b2snrh9U2zLYIpdulR4eeJHIPpzmLKYvKCHko45200WdqvMQLi'
);

const payment = async (req, res) => {
  const { id, amount, obj, error } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method: id,
      confirm: true,
    });
    const newOrder = await Order.create({ totalPrice: amount });
    const buyer = await User.findByPk(obj.idUser);
    await newOrder.setUser(buyer);

    obj.idProducts.forEach(async (prod) => {
      const idProd = await Product.findByPk(prod.id);
      newOrder.addProduct(idProd, { through: { quantity: prod.quantity } });
    });

    res.send(payment);
  } catch (error) {
    res.send({ error: error.raw.code });
  }
};
module.exports = {
  payment,
};
