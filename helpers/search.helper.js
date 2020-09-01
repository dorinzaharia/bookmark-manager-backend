// External imports
const Joi = require("joi");

module.exports = {
    schema: Joi.object().keys({
        tags: Joi.array().items(Joi.string()),
    }),
};
