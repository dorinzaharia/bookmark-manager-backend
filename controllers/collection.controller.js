// Internal imports
const User = require("../models/user.model");
const Collection = require("../models/collection.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    index: async (req, res, next) => {
        try {
            const collections = await Collection.find({});
            res.status(200).json(collections);
        } catch(error) {
            next(error);
        }  
    },
    getCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const collection = await Collection.findById(id);
            res.status(200).json(collection);
        } catch (error) {
            next(error);
        }
    },
    updateCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newCollection = req.body;
            await Collection.findByIdAndUpdate(id, newCollection);
            res.status(200).json(newCollection);
        } catch (error) {
            next(error);
        }
    },
    removeCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const collection = await Collection.findById(id);
            const userId = collection.user;
            const user = await User.findById(userId);
            await collection.remove();
            user.collections.pull(collection);
            await user.save();
            await Bookmark.update({collectionId: id}, { $unset: {collectionId: 1}}, { many: true });
            res.status(200).json(collection);
        } catch (error) {
            next(error);
        }
    }
}