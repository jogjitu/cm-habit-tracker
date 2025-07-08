const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const habitRoutes = require("../routes/habitRoutes");
const app = express();
const { db } = require("../services/firebase");

app.use(bodyParser.json());
app.use("/api", habitRoutes);

let habitId;
let testStudentId = `test-student-${Date.now()}`;
describe("Habit API", () => {
  beforeAll(async () => {
    // Create dummy student
    await db.collection("students").doc(testStudentId).set({
      name: "Test Student",
      phone: "9999999999",
      habits: [],
      createdAt: new Date().toISOString(),
    });
  });

  afterAll(async () => {
    if (habitId) {
      await db.collection("habits").doc(habitId).delete();
    }

    await db.collection("students").doc(testStudentId).delete();
  });

  it("should create a new habit and assign to all students", async () => {
    const res = await request(app).post("/api/habit").send({
      name: "Test Habit",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();

    habitId = res.body.id;

    // ✅ Verify habit assigned to student
    const studentDoc = await db.collection("students").doc(testStudentId).get();
    const studentData = studentDoc.data();
    expect(studentData.habits).toContain(habitId);
  });

  it("should return all habits", async () => {
    const res = await request(app).get("/api/habits");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((h) => h.id === habitId)).toBe(true);
  });

  it("should delete a habit", async () => {
    const res = await request(app).delete(`/api/habit/${habitId}`);
    expect(res.statusCode).toBe(200);
  });
});
