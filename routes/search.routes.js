// External imports
const router = require("express-promise-router")();

// Internal imports
const searchController = require("../controllers/search.controller.js");

router.route("/web").post(searchController.web);

router.route("/custom").post(searchController.custom);

module.exports = router;
