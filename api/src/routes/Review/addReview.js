const { Review } = require("../../db");


async function addReview (req, res, next) {
    const { score, userId, productId, } = req.body
    

    try {  
        let found = await Review.findAll({
            where: {
                userId: userId,
                productId: productId,
            }
        });
        if (!found[0]) {
            if (typeof score === 'number' && typeof userId === 'number'&& typeof productId === 'number' ) {
                if (score > 0 && score < 6) {
                    Review.create({
                        score,userId,productId
                    })
                    res.send('creado')
                } else {
                    res.status(404).send(`el score tienen que estar entre 1 y 5`)
                }
            } else {
                res.status(404).send(`todos los valores deben ser un numero`)
            }
        } else {
            res.status(404).send(`ya fue agregado un score para estos id`)
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    addReview,
  };