const { User } = require("../../db");
let deleteUser = async(req, res, next)=>{
    let validate = req.user.id 
    let admin = await User.findAll({where:{rol:"admin"}})
    console.log(admin)
    if(req.user.id === req.user.id || validate === admin.id){
        console.log("funciono")
        next()
    }else{
        res.status(404).send("no eres el propietario de la cuenta")
    }
}
module.exports = {
     deleteUser
}