const jwt = require("jsonwebtoken");
const auth = require("../../routes/User/auth");
const { User } = require("../../db");

const middCarro = async (req, res, next) => {
  let token = req.header("auth_token");
  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        res.status(500).json({
          msg: "Ocurrio un problema con el decodificador de token",
          err,
        });
      } else {
        User.findByPk(decoded.user.id).then((user) => {
          if (user.dataValues.id == req.params.id) {
            next();
          } else {
            res.status(404).json({ msg: "no eres propietario de esta cuenta" });
          }
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  middCarro,
};
