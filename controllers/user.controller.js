// Internal imports
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");
const Collection = require("../models/collection.model");
const Tag = require("../models/tag.model");

module.exports = {
    index: async (req, res) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    create: async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            res.status(409).json({
                status: false,
                message: "User with email " + email + " already exists.",
            });
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    },
    getById: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },
    updateById: async (req, res) => {
        const { userId } = req.params;
        const newUser = req.body;
        await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({
            status: true,
            message: "success",
        });
    },
    indexBookmarks: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("bookmarks");
        res.status(200).json(user.bookmarks);
    },
    createBookmark: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const newBookmark = new Bookmark(req.body);
        newBookmark.userId = user;
        await newBookmark.save();
        user.bookmarks.push(newBookmark);
        await user.save();
        res.status(201).json(newBookmark);
    },
    indexCollections: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("collections");
        res.status(200).json(user.collections);
    },
    createCollection: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const newCollection = new Collection(req.body);
        newCollection.userId = user;
        await newCollection.save();
        user.collections.push(newCollection);
        await user.save();
        res.status(201).json(newCollection);
    },
    indexTags: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("tags");
        res.status(200).json(user.tags);
    },
    createTag: async (req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const newTag = new Tag(req.body);
        newTag.user = user;
        await newTag.save();
        user.tags.push(newTag);
        await user.save();
        res.status(201).json(newTag);
    },
};
