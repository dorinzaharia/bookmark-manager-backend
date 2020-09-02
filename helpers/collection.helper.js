// External imports
const Joi = require("joi");

module.exports = {
    strictSchema: Joi.object().keys({
        title: Joi.string().min(3).max(30).required(),
    }),
    variableSchema: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        icon: Joi.string(),
    }),
};
