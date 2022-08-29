


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
            const initialValue = 0;
            const sum = scores.reduce(
              (previousValue, currentValue) => previousValue + currentValue.score,
              initialValue
            );
            res.json((sum/scores.length).toFixed(1));
          } else if (scores.length === 1) {
              res.json(scores[0].score)
          } else {
            res.json(0)
          }
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getScoreForProduct,
  };