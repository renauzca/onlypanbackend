const { User } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const sendMail = require("../../nodemailer/mailer");
const signUp = (req, res) => {
  const { name, lastName, email, password, rol } = req.body;
  let userExist = User.findOne({ email: email });
  if (password.length >= 4 && userExist) {
    let pass = bcrypt.hashSync(password, Number.parseInt(auth.rounds));
    User.create({
      password: pass,
      email: email,
      rol: rol,
      name: name,
      lastName: lastName,
    })
      .then((user) => {
        let token = jwt.sign({ user: user }, auth.secret, {
          expiresIn: auth.expires,
        });
        sendMail(
          1,
          (name = "usuari@"),
          email,
          (message = "Este es el mensaje")
        );
        sendMail(
          0,
          (name = "usuario"),
          "onlypanarg1999@gmail.com",
          (message = "Este es el mensaje")
        );
        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "El usuario ya existe." });
      });
  } else {
    res.status(401).json({ msg: "Contraseña o usuario incorrectos." });
  }
};

module.exports = {
  signUp,
};
