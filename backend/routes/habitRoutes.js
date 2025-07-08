const express = require("express");
const router = express.Router();
const {
  addHabit,
  getAllHabits,
  deleteHabit,
} = require("../controllers/habitController");

// Create habit
router.post("/habit", addHabit);

// Get all habits
router.get("/habits", getAllHabits);

// Delete habit
router.delete("/habit/:id", deleteHabit);

module.exports = router;
