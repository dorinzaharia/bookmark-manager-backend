// External imports
const router = require("express-promise-router")();

// Internal imports
const bookmarkController = require("../controllers/bookmark.controller");

router.route("/").get(bookmarkController.index);

router
    .route("/:bookmarkId")
    .get(bookmarkController.getById)
    .put(bookmarkController.updateById)
    .patch(bookmarkController.updateById)
    .delete(bookmarkController.deleteById)

router.route("/:bookmarkId/tags")
    .patch(bookmarkController.addTagById)
    .delete(bookmarkController.deleteTagById)

module.exports = router;
