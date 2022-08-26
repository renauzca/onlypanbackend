const Stripe = require("stripe");
const cors = require("cors");
const express = require("express");
const stripe = new Stripe(
  "sk_test_51LaJmxF13fYbs0Bsyd7oDYOhUbc6PCcf21MN9NsApSzpBZm2b2snrh9U2zLYIpdulR4eeJHIPpzmLKYvKCHko45200WdqvMQLi"
);

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));

const payment = async (req, res) => {
  const { id, amount, obj } = req.body;
  const infoAll = obj;
  console.log(infoAll);

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    res.send(payment);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  payment,
};
