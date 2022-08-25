const {Router} = require('express');
const router = Router();

const {payment} = require("./payment");

router.get("/", payment);

module.exports = router;