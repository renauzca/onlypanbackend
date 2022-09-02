const {Router} = require('express');
const router = Router();

const {favorite} = require('./favorite');

router.post('/', cart);

module.exports = router;

