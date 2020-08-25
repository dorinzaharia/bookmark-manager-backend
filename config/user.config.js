require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret) {
    throw new Error('JWT_SECRET is not set.')
}

module.exports = {
    jwtSecret
};


 