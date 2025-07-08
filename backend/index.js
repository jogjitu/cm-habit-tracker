const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const coachRoutes = require("./routes/coachRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/students", studentRoutes); // student register, login
app.use("/api/student", studentRoutes); // student habits
app.use("/api/coaches", coachRoutes); // coach auth
app.use("/api", habitRoutes); // habits

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.use("*", (req, res) => {
    console.log("❌ Unmatched route:", req.originalUrl);
    res.status(404).json({ error: "Route not found" });
  });
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
