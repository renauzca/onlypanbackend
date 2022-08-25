const Stripe = require('stripe')

const stripe = new Stripe("sk_test_51LaQwqHE0PqbjhpY7uyYpibi0jkU0SqJE1N7Px4HjCcsHFdAJ05FHTuViLcSbYWukQKB5u1ElRg20GdkhWdYqcmZ00chm8bHru")


const payment = async (req, res) =>{
    const {id, cantidad} = req.body;
    try {
     /*   
        const payment = await stripe.paymentIntents.create({
            cantidad,
            currency:'USD',
            description:'nombre de producto',
            payment_method: id,
            confirm: true
        });
    
        console.log(payment)
        res.status(200).send(payment) */
        res.json({name:'Enier'})
    } catch (error) {
        res.status(400).send({msg:error.raw.message})
    }
}
module.exports = {
    payment
}