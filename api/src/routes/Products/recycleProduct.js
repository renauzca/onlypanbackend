const { Product } = require("../../db");

const recycle = async(req, res) =>{
    try {
        const allProduct = await Product.findAll({ order: [["id", "ASC"]], where:{isAvailable: false} });
        res.status(200).send(allProduct)
    } catch (error) {
        res.status(404).send("error al mostrar productos eliminados")
    }
}

module.exports = {
    recycle
}