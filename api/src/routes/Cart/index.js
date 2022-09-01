const {Router} = require('express');
const router = Router();

const {cart, updateCart} = require('./cart');

router.post('/', cart);
router.put('/update/:id', updateCart);


module.exports = router;
