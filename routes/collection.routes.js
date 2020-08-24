// External imports
const router = require("express").Router();

// Internal imports
const collectionController = require("../controllers/collection.controller");

router.route("/")
    .get(collectionController.index)

router.route("/:id")
    .get(collectionController.getCollection)
    .put(collectionController.updateCollection)
    .patch(collectionController.updateCollection)
    .delete(collectionController.removeCollection)

module.exports = router;