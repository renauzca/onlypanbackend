const { Router } = require("express");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");

const router = Router();

router.post("/signIn", signIn)
router.post("/signUp", signUp)

module.exports = router;
