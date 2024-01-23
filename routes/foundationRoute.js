const express = require("express");
const foundationController = require("../controllers/foundationController");
const { route } = require("./authRoute");

const router = express.Router();

router.route("/get-foundation/:id").get(foundationController.getFoundation)

module.exports = router;