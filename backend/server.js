const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ Apply CORS Middleware FIRST
app.use(cors({
  origin: "http://localhost:5173", // Your React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Manually Handle OPTIONS Requests
app.options("/api/clients", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// ✅ Middleware to Parse JSON
app.use(express.json());

// ✅ Root Route (for testing)
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("🛜 Connected to MongoDB"));
mongoose.connection.on("open", () => console.log("🔑 MongoDB Open"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB Error:", err));


const Client = require("./models/clients");

const clientsRouter = require("./routes/clients");

const dashboardRouter = require("./routes/dashboard");

app.use("/api/clients", clientsRouter);

app.use("/api/dashboard", dashboardRouter);

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
