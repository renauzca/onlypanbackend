const { Review } = require("../../db");


async function getReviewForUserAndProduct(req, res, next) {
    const { userId , productId} = req.query;
    try {  
        let review = await Review.findAll({
            where: {
                userId: userId,
                productId: productId
            }
          });
          res.json(review)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getReviewForUserAndProduct,
  };