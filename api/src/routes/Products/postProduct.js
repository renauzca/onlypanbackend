const {Product} = require("../../db")
const {Op} = require("sequelize")
module.exports = {
    crear : async(req,res)=>{
        try {
        const {name,price,image,description,type,quantity} = req.body
        const product = await Product.findAll({where:{name:{[Op.iLike]:"%" + name + "%"}}})
           
        if(product.length === 0){
            await Product.create({name,price,image,description,type,quantity})
            res.send("congratulation")
        }else{
            res.status(404).send("el nombre ya existe")
        }
        
        } catch (error) {
            res.status(404).send(error)
        }
    }
}