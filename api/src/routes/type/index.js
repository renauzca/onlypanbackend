const { Router } = require("express");
const { getTypes } = require("./getTypes");

const router = Router();

router.get("/", getTypes);

module.exports = router;
