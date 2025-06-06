const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./connect");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/tasks", taskRoutes);

// Server start
(async function () {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Task Manager running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
  }
})();
