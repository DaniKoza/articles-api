const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const checkAuth = require('../middlewares/checkAuth');

const {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articles');

// Public routes
router.get('/', getAllArticles);
router.get('/:articleId', getArticle)

// Private routes for signed in users
router.post('/', checkAuth, upload.single('image'), createArticle);
router.patch('/:articleId', checkAuth, updateArticle);
router.delete('/:articleId', checkAuth, deleteArticle);


module.exports = router;