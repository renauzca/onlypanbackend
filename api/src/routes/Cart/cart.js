const {Cart, User, Product} = require('../../db');

const cart = async(req, res) => {
    try{
        const newCart = await Cart.create();
        const user = await User.findByPk(req.body.userId);
        await newCart.setUser(user);

        req.body.idProducts.forEach(async (pro)=>{
            const idProd = await Product.findByPk(pro.id);
            newCart.addProduct(idProd, {through:{
                quantity: pro.quantity,
                totalPrice: pro.totalPrice
            }})
        })

        res.status(200).send('Agregado a la tabla de carrito')

    }catch(error){
        throw new Error(error +' Error al llenar tabla de cart')
    }
}

module.exports = {cart}