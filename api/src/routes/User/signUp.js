const { User } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

const signUp = (req, res) => {
  const { name, password, email } = req.body;
  let pass = bcrypt.hashSync(password, Number.parseInt(auth.rounds));
  User.create({
    name: name,
    password: pass,
    email: email,
  })
    .then((user) => {
      let token = jwt.sign({ user: user }, auth.secret, {
        expiresIn: auth.expires,
      });
      res.json({
        user: user,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  signUp,
};
