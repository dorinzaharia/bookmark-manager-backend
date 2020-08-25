// External imports
const Joi = require("joi");

module.exports = {
    collectionSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        emoji: Joi.string()
    }),
    collectionOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        emoji: Joi.string(),
    })
}