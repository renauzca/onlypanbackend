const { Router } = require('express');
const router = Router();

const {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteCartPro,
} = require('./cart');

router.get('/:id', getCart);
router.post('/:id', createCart);
router.put('/update/:id', updateCart);
router.delete('/deletePro/:id', deleteCartPro);
router.delete('/delete/:id', deleteCart);

module.exports = router;
