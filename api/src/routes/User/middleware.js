const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { User } = require("../../db");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Acceso no autorizado" });
  } else {
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        res.status(500).json({
          msg: "Ocurrio un problema con el decodificador de token",
          err,
        });
      } else {
        User.findByPk(decoded.user.id,).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  }
};
