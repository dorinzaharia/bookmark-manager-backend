// Internal imports
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");
const Collection = require("../models/collection.model");
const SearchCategory = require("../models/searchCategory.model");

module.exports = {
    indexUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch(error) {
            next(error);
        }  
    },
    createNewUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        } catch(error) {
            next(error);
        }
    },
    getByUserId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    replaceUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newUser = req.body;
            const user = await User.findByIdAndUpdate(id, newUser);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newUser = req.body;
            const user = await User.findByIdAndUpdate(id, newUser);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    indexUserBookmarks: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).populate('bookmarks');
            res.status(200).json(user.bookmarks);
        } catch (error) {
            next(error);
        }
    },
    createNewUserBookmark: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newBookmark = new Bookmark(req.body);
            const user = await User.findById(id);
            newBookmark.user = user;
            await newBookmark.save();
            user.bookmarks.push(newBookmark)
            await user.save();
            res.status(201).json(newBookmark);
        } catch(error) {
            next(error);
        }
    },
    indexUserCollections: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).populate('collections');;
            res.status(200).json(user.collections);
        } catch (error) {
            next(error);
        }
    },
    createNewUserCollection: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newCollection = new Collection(req.body);
            const user = await User.findById(id);
            newCollection.user = user;
            await newCollection.save();
            user.collections.push(newCollection)
            await user.save();
            res.status(201).json(newCollection);
        } catch(error) {
            next(error);
        }
    },
    indexUserSearchCategories: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).populate('searchCategories');;
            res.status(200).json(user.searchCategories);
        } catch (error) {
            next(error);
        }
    },
    createNewUserSearchCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newSearchCategory = new SearchCategory(req.body);
            const user = await User.findById(id);
            newSearchCategory.user = user;
            await newSearchCategory.save();
            user.searchCategories.push(newSearchCategory)
            await user.save();
            res.status(201).json(newSearchCategory);
        } catch(error) {
            next(error);
        }
    }
}