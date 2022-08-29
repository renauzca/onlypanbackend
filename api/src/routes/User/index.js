const { Router } = require("express");
const { deleteUser } = require("./deleteUser");
const { allUser } = require("./getUser");
const { validate } = require("./policy");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");

const router = Router();

router.get("/", allUser);

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.put("/delete/:id", validate, deleteUser);

module.exports = router;
