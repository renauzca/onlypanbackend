const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { User } = require("../../db");

const middADM = async(req,res,next)=>{
    let admin = await User.findAll({where:{rol:"admin"}})
    let idAdm = admin.map(admin => admin.dataValues.id)
    let token = req.header("auth_token");
    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
          res.status(500).json({
            msg: "Ocurrio un problema con el decodificador de token",
            err,
          });
        } else {
          User.findByPk(decoded.user.id).then((user) => {
            if(idAdm.includes(user.dataValues.id)){
                next();
            }else{
                res.status(404).json({msg:"no eres admin"})
            }
          });
        }
      });
}

module.exports = {
    middADM
}