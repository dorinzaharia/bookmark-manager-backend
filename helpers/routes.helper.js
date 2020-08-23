// External imports
const Joi = require("joi");

module.exports = {
    schemas: {
        idParameterSchema: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        }),
        userSchema: Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(25).required(),
        }),
        userOptionalSchema: Joi.object().keys({
            name: Joi.string().min(3).max(30),
            email: Joi.string().email(),
            password: Joi.string().min(6).max(25),
        }),
        bookmarkSchema: Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            description: Joi.string(),
            url: Joi.string().uri().required()
        }),
        collectionSchema: Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            emoji: Joi.string()
        }),
        searchCategorySchema: Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            values: Joi.array().items(Joi.string())
        }),
    }
};