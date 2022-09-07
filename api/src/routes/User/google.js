const { User } = require('../../db');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const sendMail = require('../../nodemailer/mailer');

const google = async (req, res, next) => {
  try {
    const { email, name, lastName, image } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      user = await User.create({
        email,
        name,
        lastName,
        image,
        password: undefined,
      }).then((user) => {
        sendMail(1, user.dataValues.name, user.dataValues.email);
      });
      if (!user)
        return res.status(400).json({ error: 'Error al crear la cuenta!' });
    }
    if (user.dataValues.isAvailable) {
      let token = jwt.sign({ user: user }, auth.secret, {
        expiresIn: auth.expires,
      });
      return res.json({
        user: user,
        token,
      });
    } else {
      return res.status(404).send({ msg: 'Tu cuenta ha sido suspendida' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { google };
