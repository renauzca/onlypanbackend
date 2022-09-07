const {Order, Product, User} = require('../../db');

const detailById = async(req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findOne({
        where:{id:id},
        attributes:['totalPrice', 'status', 'delivery', 'createdAt'],
        include:[
            {
                model:Product,
                attributes:['name', 'price','type'],
                through: {
                    attributes:['quantity']
                }
            },
            {
                model:User,
                attributes:['name','lastName','email','address','phone']
            }
        ]
        });
        res.status(200).send(order);    
    } catch (error) {
        res.status(404).send(error+' error al mostrar detalle')
    }    
}

const allDetail = async(req, res)=>{
    try {
        const order = await Order.findAll({
            attributes:['id','totalPrice', 'status', 'delivery', 'createdAt'],
            include:[
                {
                    model:Product,
                    attributes:['name', 'price','type'],
                    through: {
                        attributes:['quantity']
                    }
                },
                {
                    model:User,
                    attributes:['name','lastName','email','address','phone']
                }
            ]
        });
        if(order){
            res.status(200).send(order); 
        }else{
            res.status(500).send('No hay ordenes creadas')
        }
    } catch (error) {
        res.status(404).send(error+' error al mostrar todos los detalle')
    }    
}
 const allSales = async(req, res) => {
    let total = 0;
    try {
        const order = await Order.findAll({
            attributes:['totalPrice'],
        });
        if(order){
            for(let i = 0; i < order.length; i++){
                total+=order[i].totalPrice;
            }
            res.status(200).send({total:total}); 
        }else{
            res.status(500).send('No hay ordenes creadas')
        }
    } catch (error) {
        res.status(404).send(error+' error al mostrar el precio total')
    }
 }

 const productStart = async(req, res) => {
    let array = [];
    try {
        const order = await Order.findAll({
            attributes:[],
            include:[
                {
                    model:Product,
                    attributes:['id'],
                    through: {
                        attributes:['quantity'],
                    }
                },
                
            ]
        });
        if(order){
            res.status(200).send(order); 
        }else{
            res.status(500).send('No hay ordenes creadas')
        }
    } catch (error) {
        res.status(404).send(error+' error al mostrar el producto mas vendido')
    }
 }
module.exports = {
    detailById,
    allDetail,
    allSales,
    productStart
}