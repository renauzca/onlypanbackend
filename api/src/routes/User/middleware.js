const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { User } = require("../../db");

module.exports = (req, res, next) => {
  const { id } = req.params;
  User.findOne({
    where: {
      id: id,
    },
  }).then((user) => {
    if (!user) {
      res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
      let token = jwt.sign({ user: user }, auth.secret, {
        expiresIn: auth.expires,
      });
      jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
          res.status(500).json({
            msg: "Ocurrio un problema con el decodificador de token",
            err,
          });
        } else {
          User.findByPk(decoded.user.id).then((user) => {
            if (
              user.dataValues.id == req.params.id ||
              idAdm.includes(user.dataValues.id)
            ) {
              console.log("entro");
              next();
            } else {
              res
                .status(404)
                .json({ msg: "no eres el propietario de esta cuenta" });
            }
          });
        }
      });
    }
  });
};
