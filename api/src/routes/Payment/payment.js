const Stripe = require('stripe');
const cors = require('cors');
const express = require('express');
const { Order, User, OrderProducts, Product } = require('../../db');
const stripe = new Stripe(
  'sk_test_51LaJmxF13fYbs0Bsyd7oDYOhUbc6PCcf21MN9NsApSzpBZm2b2snrh9U2zLYIpdulR4eeJHIPpzmLKYvKCHko45200WdqvMQLi'
);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000' || 'https://onlypan-frontend.vercel.app/',
  })
);

const payment = async (req, res) => {
  const { id, amount, obj, error } = req.body;
  console.log(id, amount, obj, error);

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
    console.log(error, 'soy el error');
    res.send({ error: error.raw.code });
  }
};
module.exports = {
  payment,
};
