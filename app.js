const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");
const app = express();

// ✅ CORS Configuration
const allowedOrigins = ["http://localhost:3000", "https://waglogy.in"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(fileUpload());

// ✅ Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/project", projectRoutes);

// ✅ Fallback Route (optional, for testing)
app.get("/", (req, res) => {
  res.send("Waglogy Backend API is running.");
});

module.exports = app;
