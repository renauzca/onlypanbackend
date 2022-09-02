const {Router} = require('express');
const router = Router();

const {
    cart,
    updateCart, 
    deleteCart,
    deleteCartPro
} = require('./cart');

router.post('/', cart);
router.put('/update/:id', updateCart);
router.delete('/deletePro/:id', deleteCartPro)
router.delete('/delete/:id', deleteCart);



module.exports = router;
