


const { Review } = require("../../db");


async function getScoreForProduct(req, res, next) {
    const { id } = req.params;
    try {  
        let scores = await Review.findAll({
            where: {
                productId:id
            }
          });
          if (scores.length > 1) {
            res.json((scores.reduce(
                (previousValue, currentValue) => previousValue.score + currentValue.score))/scores.length)
          } else {
              res.json(scores[0].score)
          }
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getScoreForProduct,
  };