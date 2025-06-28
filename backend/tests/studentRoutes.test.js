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
