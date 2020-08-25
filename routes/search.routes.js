// External imports
const router = require("express").Router();

// Internal imports
const searchController = require("../controllers/search.controller.js");

router.route("/web")
    .post(searchController.webSearch)

router.route("/custom")
    .post(searchController.customSearch)

module.exports = router;