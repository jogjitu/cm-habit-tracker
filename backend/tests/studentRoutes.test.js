const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("../routes/studentRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/students", studentRoutes);

describe("POST /api/students/register", () => {
  it("should return 400 if fields are missing", async () => {
    const res = await request(app).post("/api/students/register").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should return 201 if registration is successful", async () => {
    const res = await request(app).post("/api/students/register").send({
      uid: "test123",
      name: "Test Student",
      phone: "9876543210",
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("POST /api/students/login", () => {
  it("should return 400 if phone is missing", async () => {
    const res = await request(app).post("/api/students/login").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Phone number is required");
  });

  it("should return 404 if student is not found", async () => {
    const res = await request(app)
      .post("/api/students/login")
      .send({ phone: "0000000000" });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });

  it("should login student if phone exists", async () => {
    const studentData = {
      uid: "test-uid-login",
      name: "Test Student Login",
      phone: "9876543211",
    };

    // Ensure student exists
    await db.collection("students").doc(studentData.uid).set(studentData);

    const res = await request(app)
      .post("/api/students/login")
      .send({ phone: studentData.phone });
    expect(res.statusCode).toBe(200);
    expect(res.body.student.name).toBe(studentData.name);
    expect(res.body.uid).toBe(studentData.uid);
  });
});
