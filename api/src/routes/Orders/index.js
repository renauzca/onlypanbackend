const { Router } = require('express');
const router = Router();

const { getOrders } = require('./getOrders');
const { updateOrderStatus } = require('./updateOrders');

router.get('', getOrders);
router.get('/update/:id', updateOrderStatus);

module.exports = router;
