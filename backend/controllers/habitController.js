const { db } = require("../services/firebase");

exports.addHabit = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Habit name is required" });

  try {
    // 1. Create the habit
    const docRef = await db.collection("habits").add({
      name,
      createdAt: new Date().toISOString(),
    });

    const habitId = docRef.id;

    // 2. Assign to all students
    const studentsSnapshot = await db.collection("students").get();
    const batch = db.batch();

    studentsSnapshot.forEach((studentDoc) => {
      const studentRef = db.collection("students").doc(studentDoc.id);
      const studentData = studentDoc.data();
      const currentHabits = studentData.habits || [];

      if (!currentHabits.includes(habitId)) {
        batch.update(studentRef, {
          habits: [...currentHabits, habitId],
        });
      }
    });

    await batch.commit();

    return res.status(201).json({ success: true, id: habitId });
  } catch (error) {
    console.error("🔥 Failed to add habit:", error);
    return res.status(500).json({ error: "Failed to add habit" });
  }
};

exports.getAllHabits = async (req, res) => {
  try {
    const snapshot = await db.collection("habits").get();
    const habits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(habits);
  } catch (error) {
    console.error("🔥 Failed to fetch habits:", error);
    return res.status(500).json({ error: "Failed to fetch habits" });
  }
};

exports.deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("habits").doc(id).delete();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("🔥 Failed to delete habit:", error);
    return res.status(500).json({ error: "Failed to delete habit" });
  }
};
