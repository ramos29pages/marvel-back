const express = require('express');
const { listComicsController, getComicDetailController, addFavoriteController } = require('../controllers/comic-controller');
const authMiddleware = require('../utils/middlewares/auth-middleware');
const router = express.Router();

router.get('/', authMiddleware, listComicsController);
router.get('/:comicId', authMiddleware, getComicDetailController);
router.post('/add-favorite', authMiddleware, addFavoriteController);

module.exports = router;


