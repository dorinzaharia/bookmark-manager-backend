// External imports
const jwt = require("jsonwebtoken");

// Internal imports
const User = require("../models/user.model");
const { jwtSecret } = require("../config/user.config");

signUser = user => {
    return jwt.sign(
        {
            iss: "BookmarksApp",
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate + 1),
        },
        jwtSecret
    );
};

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(403).json({ error: "User already exists" });
            }
            const newUser = new User({ email, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
};
