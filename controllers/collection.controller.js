// Internal imports
const User = require("../models/user.model");
const Collection = require("../models/collection.model");
const Bookmark = require("../models/bookmark.model");
const { mapReduce } = require("../models/user.model");

module.exports = {
    index: async (req, res) => {
        const collections = await Collection.find({});
        res.status(200).json(collections);
    },
    getById: async (req, res) => {
        const { collectionId } = req.params;
        const collection = await Collection.findById(collectionId);
        res.status(200).json(collection);
    },
    updateById: async (req, res) => {
        const { collectionId } = req.params;
        const newCollection = req.body;
        await Collection.findByIdAndUpdate(collectionId, newCollection);
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    deleteById: async (req, res) => {
        const { collectionId } = req.params;
        const collection = await Collection.findById(collectionId);
        const userId = collection.userId;
        const user = await User.findById(userId);
        await collection.remove();
        user.collections.pull(collection);
        await user.save();
        await Bookmark.update(
            { collectionId: id },
            { $unset: { collectionId: 1 } },
            { many: true }
        );
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    deleteByIdWithBookmarks: async (req, res) => {
        const { collectionId } = req.params;
        const collection = await Collection.findById(collectionId);
        const bookmarks = await Bookmark.find({ collectionId });
        const userId = collection.userId;
        const user = await User.findById(userId);
        bookmarks.map(async bookmark => {
            await bookmark.remove();
            user.bookmarks.pull(bookmark);
        })
        await collection.remove();
        user.collections.pull(collection);
        await user.save();

        res.status(200).json({
            status: true,
            message: "success",
        });
    },
};
