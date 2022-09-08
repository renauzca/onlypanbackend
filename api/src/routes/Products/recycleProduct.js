const { Product } = require("../../db");

const recycle = async(req, res) =>{
    try {
        const allProduct = await Product.findAll({ order: [["id", "ASC"]], where:{isAvailable: false} });
        res.status(200).send(allProduct)
    } catch (error) {
        res.status(404).send(error+" error al mostrar productos eliminados")
    }
}

const addProduct = async(req, res) =>{
    const {id} = req.params;
    try{
        const prod = await Product.findByPk(id);
        if(!prod.isAvailable){
            await prod.update({
                isAvailable: true
            })
            res.status(200).send("producto reintegrado")
        }else{
            res.status(500).send("producto no se encuentra como elminicado")
        }
    }catch(error){
        res.status(404).send(error+" error al integrar producto")
    }
}

module.exports = {
    recycle,
    addProduct
}