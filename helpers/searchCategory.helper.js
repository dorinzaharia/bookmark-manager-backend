// External imports
const Joi = require("joi");

module.exports = {
    searchCategorySchema: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        values: Joi.array().items(Joi.string()).required()
    }),
    searchCategoryOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        values: Joi.array().items(Joi.string())
    })
}