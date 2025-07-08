const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");

router.post("/register", coachController.registerCoach);
router.post("/login", coachController.loginCoach);

module.exports = router;
