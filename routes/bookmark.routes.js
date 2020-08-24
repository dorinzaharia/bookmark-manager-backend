// External imports
const router = require("express").Router();

// Internal imports
const bookmarkController = require("../controllers/bookmark.controller");

router.route("/")
    .get(bookmarkController.index)

router.route("/:id")
    .get(bookmarkController.getBookmark)
    .put(bookmarkController.updateBookmark)
    .patch(bookmarkController.updateBookmark)
    .delete(bookmarkController.removeBookmark)



module.exports = router;