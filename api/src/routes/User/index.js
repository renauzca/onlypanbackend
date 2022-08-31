const { Router } = require("express");
const { deleteUser } = require("./deleteUser");
const { allUser } = require("./getUser");
const { google } = require("./google");
const { validate } = require("./policy");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");
const { updateUser } = require("./updateUserbyUser");

const router = Router();

router.get("/", allUser);

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/google", google);

router.post("/modify/:id",validate,updateUser);
router.put("/delete/:id", validate, deleteUser);

module.exports = router;
