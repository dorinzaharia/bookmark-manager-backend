// External imports
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Internal imports
const User = require("../models/user.model");
const { jwtSecret } = require("../config/user.config");

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.sub);
                if (!user) {
                    return done(null, false);
                }
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false);
                }
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return done(null, false);
                }
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
