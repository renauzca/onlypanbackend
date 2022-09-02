const {Cart, User, Product, ProductCart} = require('../../db');

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

const updateCart = async(req, res) => {
    try{
        const {id} = req.params;
        
        await Cart.findOne({where:{userId:id}})
            
            .then(async(cart) => {
               let pro = await ProductCart.findOne(
                {
                    where:{
                        cartId:cart.id,
                        productId:req.body.id    
                    }});
                
               if(pro){
                    await pro.update({
                        quantity: req.body.quantity,
                        totalPrice: req.body.totalPrice
                    }
                    )
                    pro.save()
                    res.status(200).send('Producto Modificado')
                }
            else{
                res.status(200).send("Producto no encontrado");
            }
            }) 
                    
    }catch(error){
        console.log(error);
        throw new Error(error +' Error al cambiar datos del carrito')
    }
}

module.exports = {
    cart,
    updateCart
}