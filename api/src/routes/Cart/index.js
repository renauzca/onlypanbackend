const {Router} = require('express');
const router = Router();

const {cart} = require('./cart');

router.post('/', cart);

module.exports = router;
