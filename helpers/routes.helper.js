// External imports
const Joi = require("joi");

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const validationResult = schema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json(validationResult.error);
            }
            next();
        }
    },
    schemas: {
        idParamSchema: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
};