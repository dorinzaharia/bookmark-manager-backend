// External imports
const jwt = require("jsonwebtoken");

// Internal imports
const { jwtSecret } = require("../config/user.config");

module.exports = {
    onlySameUser: (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, jwtSecret);
        const { userId } = req.params;
        if (userId !== decodedToken.sub) {
            return res.status(400).json({
                status: false,
                message: "Permission denied: Unauthorized",
            });
        }
        return next();
    },
};
