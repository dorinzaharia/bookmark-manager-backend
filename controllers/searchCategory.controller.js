// Internal imports
const User = require("../models/user.model");
const SearchCategory = require("../models/searchCategory.model");

module.exports = {
    index: async (req, res, next) => {
        try {
            const categories = await SearchCategory.find({});
            res.status(200).json(categories);
        } catch(error) {
            next(error);
        }  
    },
    getCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await Bookmark.findById(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newCategory = req.body;
            await SearchCategory.findByIdAndUpdate(id, newCategory);
            res.status(200).json(newCategory);
        } catch (error) {
            next(error);
        }
    },
    removeCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await SearchCategory.findById(id);
            const userId = bookmark.user;
            const user = await User.findById(userId);
            await category.remove();
            user.categories.pull(category);
            await user.save();
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
}