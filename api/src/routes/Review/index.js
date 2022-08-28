const { Router } = require("express");
const router = Router();

const { addReview } = require("./addReview");
const { getAllReview } = require("./getAllReview");
const { getReviewForUserAndProduct } = require("./getReviewForUserAndProduct");
const { getAllReviewForUser } = require("./getAllReviewForUser");
const { getScoreForProduct } = require("./getScoreForProduct");
const { updateReview } = require("./updateReview");

router.post("/add", addReview);
router.put("/put", updateReview);
router.get("/get", getAllReview);
router.get("/get", getReviewForUserAndProduct);

router.get("/user/:id", getAllReviewForUser);
router.get("/product/:id", getScoreForProduct);

module.exports = router;

