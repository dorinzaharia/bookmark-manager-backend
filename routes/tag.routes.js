// External imports
const router = require("express-promise-router")();

// Internal imports
const tagController = require("../controllers/tag.controller");

router.route("/").get(tagController.index);

router
    .route("/:tagId")
    .get(tagController.getById)
    .put(tagController.updateById)
    .patch(tagController.updateById)
    .delete(tagController.deleteById);

module.exports = router;
