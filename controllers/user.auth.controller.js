// External imports
const jwt = require("jsonwebtoken");

// Internal imports
const User = require("../models/user.model");
const { jwtSecret } = require("../config/user.config");

signToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
        },
        jwtSecret
    );
};

module.exports = {
    signUp: async (req, res) => {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({
                status: false,
                message: "User with email " + email + " already exists.",
            });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        const token = signToken(newUser);
        res.status(201).json({ token, user: newUser });
    },
    signIn: (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
};
