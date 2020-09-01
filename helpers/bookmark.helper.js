// External imports
const Joi = require("joi");

module.exports = {
    strictSchema: Joi.object().keys({
        title: Joi.string().min(3).max(45).required(),
        description: Joi.string().max(300),
        url: Joi.string().uri().required(),
    }),
    variableSchema: Joi.object().keys({
        title: Joi.string().min(3).max(45),
        description: Joi.string().max(300),
        url: Joi.string().uri(),
        usageCounter: Joi.number(),
        collectionId: Joi.ObjectId(),
        tags: Joi.array().items(Joi.ObjectId()),
    }),
};
