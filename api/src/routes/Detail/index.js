const {Router} = require('express');
const router = Router();

const {
    detailById,
    allDetail, 
    allSales,
    productStart
} = require('./detail');

router.get('/', allDetail);
router.get('/allSales', allSales);
router.get('/productStart', productStart);
router.get('/:id', detailById);

module.exports = router;