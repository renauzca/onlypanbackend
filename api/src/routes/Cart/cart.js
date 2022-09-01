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
        const {quantity, totalPrice} = req.body;
        
        /* console.log(id+ ' por params')
        let user = await User.findByPk(id);
        console.log(id+ ' retorno de user') */
        //let cart = await Cart.findOne({where:{userId:id}});
       /*  console.log(typeof cart + ' retorno de cart')
        cart = parseInt(cart) */
        await Cart.findOne({where:{userId:id}})
            
            .then(async(cart) => {
                
                await ProductCart.findAll({where:{cartId:cart.dataValues.id}})
                    .then(pro =>{
                        if(pro){
                            pro.forEach(p => {
                                p.set(req.body)
                                p.save();         
                            })
                            res.status(200).send(pro)
                        }else{
                            res.status(200).send('Usuario no tiene carrito');
                        }

                    })
                /* .then(pro =>{
                    console.log(pro)
                    if(pro){
                        pro.set(req.body);
                        pro.save();
                        res.status(200).send(pro);
                    }else{
                        res.status(200).send('Usuario no tiene carrito')
                    }

                }) */
            })


        /* console.log( typeof cart + ' retorno de cart')
        let productCart = await ProductCart.findOne({where:{cartId:cart.cartId}})
        console.log(productCart+' desde el productCart')
        if(productCart){
            productCart.set(req.body);
            productCart.save();
            res.status(200).send(productCart);
        }else{
            res.status(200).send('Usuario no tiene carrito')
        } */
    }catch(error){
        throw new Error(error +' Error al cambiar datos del carrito')
    }
}

module.exports = {
    cart,
    updateCart
}