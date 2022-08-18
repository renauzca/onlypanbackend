const {Product} = require("../../db")

module.exports = {
    crear : async(req,res)=>{
        try {
        const {name,price,image,description,type} = req.body

        await Product.create({name,price,image,description,type})

        res.send("congratulation")
        } catch (error) {
            res.status(404).send(error)
        }
    }
}