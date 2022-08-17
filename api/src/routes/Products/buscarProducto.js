const json = require("../../jsonData")
const {Product} = require("../../models/Product")

const buscar = async(req,res)=>{
    let info = json
    console.log(info)
    res.send(info)
}

module.exports = {
   buscar,
}