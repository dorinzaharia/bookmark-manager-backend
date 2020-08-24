// Internal imports
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    index: async (req, res, next) => {
        try {
            const bookmarks = await Bookmark.find({});
            res.status(200).json(bookmarks);
        } catch(error) {
            next(error);
        }  
    },
    getBookmark: async (req, res, next) => {
        try {
            const { id } = req.params;
            const bookmark = await Bookmark.findById(id);
            res.status(200).json(bookmark);
        } catch (error) {
            next(error);
        }
    },
    updateBookmark: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newBookmark = req.body;
            await Bookmark.findByIdAndUpdate(id, newBookmark);
            res.status(200).json(newBookmark);
        } catch (error) {
            next(error);
        }
    },
    removeBookmark: async (req, res, next) => {
        try {
            const { id } = req.params;
            const bookmark = await Bookmark.findById(id);
            const userId = bookmark.user;
            const user = await User.findById(userId);
            await bookmark.remove();
            user.bookmarks.pull(bookmark);
            await user.save();
            res.status(200).json(bookmark);
        } catch (error) {
            next(error);
        }
    }
}