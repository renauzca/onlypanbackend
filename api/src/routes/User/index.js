const { Router } = require("express");
const { allUser } = require("./getUser");
const { google } = require("./google");
const { signIn } = require("./signIn");
const { signUp } = require("./signUp");
const { deleteUser } = require("./deleteUser");
const { updateUser } = require("./updateUserbyUser");
const { middUser } = require("./pruebaUser");
const { policy } = require("./policy");
const { middADM } = require("./pruebaAdmin");
const { updateUserbyAdmin } = require("./updateUserbyAdmin");

const router = Router();

router.get("/", middADM, allUser);

// logins
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/google", google);
// dataUpdate
router.put("/modify/:id", middUser, updateUser);
router.get("/rolmodify/:id", middADM, updateUserbyAdmin);
router.put("/delete/:id", policy, deleteUser);

module.exports = router;
