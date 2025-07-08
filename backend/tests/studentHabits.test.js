const request = require("supertest");
const { db } = require("../services/firebase");
const app = require("../index");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const testStudentId = "test-student-" + Date.now();
const testHabitId = "test-habit-" + Date.now();

beforeAll(async () => {
  // Create test habit
  await db.collection("habits").doc(testHabitId).set({
    name: "Test Habit for Student",
    createdAt: new Date().toISOString(),
  });

  // Create test student with that habit
  await db
    .collection("students")
    .doc(testStudentId)
    .set({
      name: "Test Student",
      phone: "1234567890",
      habits: [testHabitId],
      createdAt: new Date().toISOString(),
    });
});

afterAll(async () => {
  await db.collection("students").doc(testStudentId).delete();
  await db.collection("habits").doc(testHabitId).delete();
  await db
    .collection("students")
    .doc(testStudentId)
    .collection("habitLogs")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => doc.ref.delete());
    });
});

describe("Student Habit API", () => {
  it("should fetch assigned habits for a student", async () => {
    const res = await request(app).get(`/api/student/${testStudentId}/habits`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].id).toBe(testHabitId);
  });

  it("should allow student to mark habits for today", async () => {
    const res = await request(app)
      .post(`/api/student/${testStudentId}/habits/mark`)
      .send({ habitsDone: [testHabitId] });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Check if record exists in Firestore
    const today = new Date().toISOString().split("T")[0];
    const logDoc = await db
      .collection("students")
      .doc(testStudentId)
      .collection("habitLogs")
      .doc(today)
      .get();
    expect(logDoc.exists).toBe(true);
    expect(logDoc.data().completed).toContain(testHabitId);
  });
});
