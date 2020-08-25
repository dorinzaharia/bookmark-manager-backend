// External imports
const Joi = require("joi");

module.exports = {
    tagSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
    }),
    tagOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
    })
}