const { Router } = require("express");
const { deleteUser } = require("./deleteUser");
const { allUser } = require("./getUser");
const middleware = require("./middleware");
const policy = require("./policy");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");

const router = Router();

router.get("/", allUser);

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.put("/delete/:id", middleware, policy.validate, deleteUser);

module.exports = router;
