const express = require("express");
const {
  registerStudent,
  loginStudent,
  getAllStudents,
  deleteStudent,
  getStudentHabits,
  markHabitsDoneToday,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/", getAllStudents);
router.delete("/:id", deleteStudent);
router.get("/:uid/habits", (req, res, next) => {
  console.log("🎯 GET /api/student/:uid/habits hit");
  next();
}, getStudentHabits);
router.post("/:uid/habits/mark", markHabitsDoneToday);

module.exports = router;
