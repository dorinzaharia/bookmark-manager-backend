// External imports
const Joi = require("joi");

module.exports = {
    bookmarkSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().max(150),
        url: Joi.string().uri().required()
    }),
    bookmarkOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        description: Joi.string().max(150),
        url: Joi.string().uri(),
        counter: Joi.number(),
        collectionId: Joi.ObjectId(),
        tags: Joi.array().items(Joi.ObjectId())
    }),
}