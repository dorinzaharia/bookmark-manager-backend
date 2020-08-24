// Internal imports
const User = require("../models/user.model");
const Tag = require("../models/tag.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    list: async (req, res, next) => {
        try {
            const tags = await Tag.find({});
            res.status(200).json(tags);
        } catch(error) {
            next(error);
        }  
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const tag = await Tag.findById(id);
            res.status(200).json(tag);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newTag = req.body;
            await Tag.findByIdAndUpdate(id, newTag);
            res.status(200).json(newTag);
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            const tag = await Tag.findById(id);
            const userId = tag.user;
            const user = await User.findById(userId);
            await tag.remove();
            user.tags.pull(tag);
            await user.save();
            await Bookmark.update({tags: id}, { $unset: {tags: 1}}, { many: true });
            res.status(200).json(tag);
        } catch (error) {
            next(error);
        }
    }
}