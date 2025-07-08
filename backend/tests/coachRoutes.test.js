const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const coachRoutes = require("../routes/coachRoutes");
const app = express();
app.use(bodyParser.json());
app.use("/api/coaches", coachRoutes);

describe("POST /api/coaches", () => {
  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/api/coaches/register").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should register a new coach", async () => {
    const res = await request(app).post("/api/coaches/register").send({
      name: "Coach John",
      email: "coach.john@example.com",
    });
    expect(res.statusCode === 201 || res.statusCode === 409).toBeTruthy();
  });

  it("should login an existing coach", async () => {
    const res = await request(app).post("/api/coaches/login").send({
      email: "coach.john@example.com",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.coach).toHaveProperty("name", "Coach John");
  });
});
