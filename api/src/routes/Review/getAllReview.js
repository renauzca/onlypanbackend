const { Review } = require("../../db");


async function getAllReview(req, res, next) {
    try {  
        let scores = await Review.findAll({
          });
          res.json(scores)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getAllReview,
  };