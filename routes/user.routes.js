// External imports
const router = require("express").Router();

// Internal imports
const userController = require("../controllers/user.controller");
const { validateParam, schema } = require("../helpers/routes.helper")

router.route("/")
    .get(userController.indexUsers)
    .post(userController.createNewUser)

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

router.route("/:id/searchCategories")
    .get(userController.indexUserSearchCategories)
    .post(userController.createNewUserSearchCategory)


module.exports = router;