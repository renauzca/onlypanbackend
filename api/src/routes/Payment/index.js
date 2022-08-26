const { Router } = require("express");
const router = Router();

const { payment } = require("./payment");

router.post("/", payment);

module.exports = router;
