// Internal imports
const User = require("../models/user.model");
const Tag = require("../models/tag.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    index: async (req, res) => {
        const tags = await Tag.find({});
        res.status(200).json(tags);
    },
    getById: async (req, res) => {
        const { tagId } = req.params;
        const tag = await Tag.findById(tagId);
        res.status(200).json(tag);
    },
    updateById: async (req, res) => {
        const { tagId } = req.params;
        const newTag = req.body;
        await Tag.findByIdAndUpdate(tagId, newTag);
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    deleteById: async (req, res) => {
        const { tagId } = req.params;
        const tag = await Tag.findById(tagId);
        const userId = tag.userId;
        const user = await User.findById(userId);
        await tag.remove();
        user.tags.pull(tag);
        await user.save();
        await Bookmark.update(
            { tags: tagId },
            { $pull: { tags: tagId } },
            { many: true }
        );
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
};
