const { db } = require("../services/firebase");

const registerStudent = async (req, res) => {
  const { uid, name, phone } = req.body;

  if (!uid || !name || !phone)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    await db.collection("students").doc(uid).set({
      name,
      phone,
      habits: [],
      createdAt: new Date().toISOString(),
    });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("🔥 Firebase error:", error); // 🔍 Log the real issue
    return res.status(500).json({ error: "Failed to register student" });
  }
};

const loginStudent = async (req, res) => {
  const { phone } = req.body;

  if (!phone)
    return res.status(400).json({ error: "Phone number is required" });

  try {
    const snapshot = await db
      .collection("students")
      .where("phone", "==", phone)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentDoc = snapshot.docs[0];
    return res
      .status(200)
      .json({ student: studentDoc.data(), uid: studentDoc.id });
  } catch (error) {
    console.error("🔥 Firebase error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const snapshot = await db.collection("students").get();
    const students = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(students);
  } catch (error) {
    console.error("🔥 Firebase error:", error);
    return res.status(500).json({ error: "Failed to fetch students" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("students").doc(id).delete();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("🔥 Firebase error:", error);
    return res.status(500).json({ error: "Failed to delete student" });
  }
};

const getStudentHabits = async (req, res) => {
  const { uid } = req.params;

  try {
    const studentDoc = await db.collection("students").doc(uid).get();
    if (!studentDoc.exists)
      return res.status(404).json({ error: "Student not found" });

    const studentData = studentDoc.data();
    const habitIds = studentData.habits || [];

    // Fetch habit details from habits collection
    const habitsSnapshot = await db
      .collection("habits")
      .where("__name__", "in", habitIds.length > 0 ? habitIds : ["dummy"]) // fallback for empty
      .get();

    const habits = habitsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(habits);
  } catch (error) {
    console.error("🔥 Error fetching student habits:", error);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

const markHabitsDoneToday = async (req, res) => {
  const { uid } = req.params;
  const { habitsDone } = req.body;

  if (!Array.isArray(habitsDone)) {
    return res.status(400).json({ error: "habitsDone must be an array" });
  }

  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    await db
      .collection("students")
      .doc(uid)
      .collection("habitLogs")
      .doc(today)
      .set({
        completed: habitsDone,
        timestamp: new Date().toISOString(),
      });

    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Error marking habits:", error);
    res.status(500).json({ error: "Failed to mark habits" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getAllStudents,
  deleteStudent,
  getStudentHabits,
  markHabitsDoneToday,
};
