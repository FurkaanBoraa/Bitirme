const express = require("express");
const userController = require("../controllers/userController");
const { route } = require("./authRoute");

const router = express.Router();

router.route("/get-events-registered/:userid").get(userController.getEventsRegistered);
router.route("/register-to-event/:eventid").post(userController.registerToEvent);
router.route("/donate-to-foundation/:userid").post(userController.donateToFoundation);
router.route("/get-donations/:userid").get(userController.getDonations);


module.exports = router;
