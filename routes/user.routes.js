// External imports
const router = require("express").Router();

// Internal imports
const userController = require("../controllers/user.controller");

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

router.route("/:id/categories")
    .get(userController.indexUserSearchCategories)
    .post(userController.createNewUserSearchCategory)

router.route("/:id/tags")
    .get(userController.indexUserTags)
    .post(userController.createNewUserTag)


module.exports = router;