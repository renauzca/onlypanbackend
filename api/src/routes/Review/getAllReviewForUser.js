const { Review } = require("../../db");


async function getAllReviewForUser(req, res, next) {
    const { id } = req.params;
    try {  
        let scores = await Review.findAll({
            where: {
                userId:id
            }
          });
          res.json(scores)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getAllReviewForUser,
  };