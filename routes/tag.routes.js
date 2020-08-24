// External imports
const router = require("express").Router();

// Internal imports
const tagController = require("../controllers/tag.controller");

router.route("/")
    .get(tagController.list)

router.route("/:id")
    .get(tagController.get)
    .put(tagController.update)
    .patch(tagController.update)
    .delete(tagController.remove)

module.exports = router;