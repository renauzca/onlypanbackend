const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

let validate = async(req, res, next)=>{
    let admin = await User.findAll({where:{rol:"admin"},atributtes:["id"]})
    let idAdm = admin.map(admin => admin.dataValues.id)
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
          res.status(500).json({
            msg: "Ocurrio un problema con el decodificador de token",
            err,
          });
        } else {
          User.findByPk(decoded.user.id,).then((user) => {
            if(user.dataValues.id == req.params.id||idAdm.includes(user.dataValues.id)){
                console.log("entro")
                next();
            }else{
                res.status(404).json({msg:"no eres el propietario de esta cuenta"})
            }
          });
        }
      });
}
module.exports = {
     validate
}