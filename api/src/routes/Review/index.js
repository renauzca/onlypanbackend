const { Router } = require("express");
const router = Router();

const { addReview } = require("./addReview");
const { getAllReview } = require("./getAllReview");
const { getAllReviewForUser } = require("./getAllReviewForUser");
const { getReviewForUserAndProduct } = require("./getReviewForUserAndProduct");
const { updateReview } = require("./updateReview");

router.post("/add", addReview);
router.put("/put", updateReview);
router.get("/get", getReviewForUserAndProduct);
router.get("/get", getAllReview);
router.get("/get/:id", getAllReviewForUser);

module.exports = router;