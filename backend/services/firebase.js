const admin = require("firebase-admin");
const path = process.env.FIREBASE_TEST_KEY || "../firebase-service-account.json";

if (!admin.apps.length) {
  try {
    const serviceAccount = require(path);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.error("🔥 Failed to load Firebase credentials:", err);
  }
}

const db = admin.firestore();
module.exports = { admin, db };
