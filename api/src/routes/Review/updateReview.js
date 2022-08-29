const { Review } = require("../../db");


async function updateReview(req, res, next) {
    
    const {userId, productId } = req.body;
    try {
        let found = await Review.findAll({
            where: {
                userId: userId,
                productId: productId,
            }
        });
        found[0].set(req.body)
          found[0].save()
        res.json(found)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    updateReview,
  };