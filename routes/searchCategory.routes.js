// External imports
const router = require("express").Router();

// Internal imports
const searchCategoryController = require("../controllers/searchCategory.controller");

router.route("/")
    .get(searchCategoryController.index)

router.route("/:id")
    .get(searchCategoryController.getCategory)
    .put(searchCategoryController.updateCategory)
    .patch(searchCategoryController.updateCategory)
    .delete(searchCategoryController.removeCategory)

module.exports = router;