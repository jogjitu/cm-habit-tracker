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
    return res.status(500).json({ error: "Failed to register student" });
  }
};

module.exports = { registerStudent };
