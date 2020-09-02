// Internal imports
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    index: async (req, res) => {
        const bookmarks = await Bookmark.find({});
        res.status(200).json(bookmarks);
    },
    getById: async (req, res) => {
        const { bookmarkId } = req.params;
        const bookmark = await Bookmark.findById(bookmarkId);
        res.status(200).json(bookmark);
    },
    updateById: async (req, res) => {
        const { bookmarkId } = req.params;
        const newBookmark = req.body;
        await Bookmark.findByIdAndUpdate(bookmarkId, newBookmark);
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    deleteById: async (req, res) => {
        const { bookmarkId } = req.params;
        const bookmark = await Bookmark.findById(bookmarkId);
        const userId = bookmark.userId;
        const user = await User.findById(userId);
        await bookmark.remove();
        user.bookmarks.pull(bookmark);
        await user.save();
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    addTagById: async (req, res) => {
        const { bookmarkId } = req.params;
        const bookmark = await Bookmark.findById(bookmarkId);
        const { tagId } = req.query;
        bookmark.tags.push(tagId)
        bookmark.save();
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    deleteTagById: async (req, res) => {
        const { bookmarkId } = req.params;
        const bookmark = await Bookmark.findById(bookmarkId);
        const { tagId } = req.query;
        bookmark.tags.pull(tagId)
        bookmark.save();
        res.status(200).json({
            status: true,
            message: "success",
        });
    },

};
