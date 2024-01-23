const express = require("express");
const eventController = require("../controllers/eventController");
const { route } = require("./authRoute");

const router = express.Router();

router.route("/get-events").get(eventController.getFutureEvents);
router.route("/get-event-info/:id").get(eventController.getEventInfo);
// router.route("/create-event", eventController.createEvent)

module.exports = router;
