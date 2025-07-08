const { db } = require("../services/firebase"); // ✅ correct import

exports.registerCoach = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Missing fields" });

    const docRef = db.collection("coaches").doc(email);
    const doc = await docRef.get();
    if (doc.exists) return res.status(409).json({ error: "Coach already exists" });

    await docRef.set({ name, email, createdAt: new Date().toISOString() });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("🔥 Coach register error:", error);
    return res.status(500).json({ error: "Failed to register coach" });
  }
};

exports.loginCoach = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const docRef = db.collection("coaches").doc(email);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: "Coach not found" });

    return res.status(200).json({ coach: doc.data() });
  } catch (error) {
    console.error("🔥 Coach login error:", error);
    return res.status(500).json({ error: "Failed to login coach" });
  }
};
