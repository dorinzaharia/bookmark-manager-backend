// External imports
const Joi = require("joi");

module.exports = {
    userSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(25).required(),
    }),
    userOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(25),
        allowCollectingData: Joi.boolean(),
        bookmarks: Joi.array().items(Joi.ObjectId()),
        collections: Joi.array().items(Joi.ObjectId()),
        searchCategories: Joi.array().items(Joi.ObjectId()),
        tags: Joi.array().items(Joi.ObjectId())
    })
}


