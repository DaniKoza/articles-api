module.exports = {
    getAllArticles: (req, res) => {
        res.status(200).json({
            message : 'Get all articles'
        });
    },
    createArticle: (req, res) => {
        res.status(200).json({
            message: 'Create a new article'
        });
    },
    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({
            message: `Update article - ${articleId}`
        });
    },
    deleteArticle:(req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({
            message: `Delete article - ${articleId}`
        });
    },
}