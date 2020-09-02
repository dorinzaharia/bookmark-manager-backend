// External imports
const router = require("express-promise-router")();
const passport = require("passport");

// Internal imports
const userController = require("../controllers/user.controller");
const authUserController = require("../controllers/user.auth.controller");
const fileController = require("../controllers/file.controller");

const permissionController = require("../middleware/auth.permission.middleware");

// Passport
const passportConfig = require("../middleware/auth.validation.middleware");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/").get(userController.index).post(userController.create);

router.route("/signup").post(authUserController.signUp);

router.route("/signin").post(authUserController.signIn);

router
    .route("/:userId")
    .get(userController.getById)
    .put(userController.updateById)
    .patch(userController.updateById);

router
    .route("/:userId/import")
    .post(fileController.import)

router
    .route("/:userId/export")
    .post(fileController.export)

router
    .route("/:userId/bookmarks")
    .get(userController.indexBookmarks)
    .post(userController.createBookmark);

router
    .route("/:userId/collections")
    .get(userController.indexCollections)
    .post(userController.createCollection);

router
    .route("/:userId/tags")
    .get(userController.indexTags)
    .post(userController.createTag);

module.exports = router;
