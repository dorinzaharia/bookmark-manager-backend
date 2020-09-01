// External imports
const router = require("express-promise-router")();

// Internal imports
const collectionController = require("../controllers/collection.controller");

router.route("/").get(collectionController.index);

router
    .route("/:collectionId")
    .get(collectionController.getById)
    .put(collectionController.updateById)
    .patch(collectionController.updateById)
    .delete(collectionController.deleteById)
    .delete(collectionController.deleteByIdWithBookmarks);

module.exports = router;
