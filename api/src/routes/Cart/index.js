const { Router } = require('express');
const router = Router();

const {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteCartPro,
} = require('./cart');
const { middCarro } = require('./middCart');

router.get('/:id',middCarro, getCart);
router.post('/:id',middCarro, createCart);
router.put('/update/:id',middCarro, updateCart);
router.delete('/deletePro/:id',middCarro, deleteCartPro);
router.delete('/delete/:id',middCarro, deleteCart);

module.exports = router;
