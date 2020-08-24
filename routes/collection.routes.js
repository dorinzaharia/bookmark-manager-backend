// External imports
const router = require("express").Router();

// Internal imports
const collectionController = require("../controllers/collection.controller");

router.route("/")
    .get(collectionController.list)

router.route("/:id")
    .get(collectionController.get)
    .put(collectionController.update)
    .patch(collectionController.update)
    .delete(collectionController.remove)

module.exports = router;