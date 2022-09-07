const {Router} = require('express');
const router = Router();

const {favorite, allFavorite, deleteFavorite} = require('./favorite');

router.post('/', favorite);
router.get('/all/:id', allFavorite);
router.delete('/delete/:id', deleteFavorite)

module.exports = router;

