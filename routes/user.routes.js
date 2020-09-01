// External imports
const router = require("express").Router();
const passport = require('passport');

// Internal imports
const userController = require("../controllers/user.controller");
const authUserController = require("../controllers/user.auth.controller");

// Passport
const passportConfig = require('../middleware/auth.validation.middleware');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route("/")
    .get(userController.indexUsers)

router.route("/signup")
    .post(authUserController.signUp)

router.route("/signin")
    .post(authUserController.signIn)

router.route("/:id")
    .get(userController.getByUserId)
    .put(userController.replaceUserById)
    .patch(userController.updateUserById)

router.route("/:id/bookmarks")
    .get(userController.indexUserBookmarks)
    .post(userController.createNewUserBookmark)

router.route("/:id/collections")
    .get(userController.indexUserCollections)
    .post(userController.createNewUserCollection)

router.route("/:id/tags")
    .get(userController.indexUserTags)
    .post(userController.createNewUserTag)


module.exports = router;