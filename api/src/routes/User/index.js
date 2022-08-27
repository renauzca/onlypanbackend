const { Router } = require("express");
const { deleteUser } = require("./deleteUser");
const { allUser } = require("./getUser");
const middleware = require("./middleware");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");

const router = Router();

router.get("/", middleware, allUser)

router.post("/signIn", signIn)
router.post("/signUp", signUp)

router.put("/delete/:id", middleware , deleteUser)

module.exports = router;
