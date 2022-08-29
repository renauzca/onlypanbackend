const { Router } = require('express');
const router = Router();

const { getOrders } = require('./getOrders');

router.get('', getOrders);

module.exports = router;
