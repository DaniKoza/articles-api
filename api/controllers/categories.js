module.exports = {
    getAllCategories: (req, res) => {
        res.status(200).json({
            message : 'Get all Categories'
        });
    },
    createCategory: (req, res) => {
        res.status(200).json({
            message: 'Create a new Category'
        });
    },
    updateCategory: (req, res) => {
        const categoryId = req.params.categoryId;
        res.status(200).json({
            message: `Update Category - ${categoryId}`
        });
    },
    deleteCategory:(req, res) => {
        const categoryId = req.params.categoryId;
        res.status(200).json({
            message: `Delete Category - ${categoryId}`
        });
    },
}