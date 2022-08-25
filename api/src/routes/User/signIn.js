const { User } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

const signIn = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (!user) {
        res.status(404).json({ msg: "Usuario no encontrado" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ user: user }, auth.secret, {
            expiresIn: auth.expires,
          });
          res.json({
            user: user,
            token: token,
          });
        } else {
          res.status(401).json({ msg: "Contraseña incorrecta" });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  signIn,
};
