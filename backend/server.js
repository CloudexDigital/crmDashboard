const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Apply CORS with explicit settings
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Manually handle OPTIONS (Preflight) requests
app.options("/api/clients", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);  // This ensures the request doesn't get blocked
});

app.use(express.json());

// ✅ Define your routes
app.get("/api/clients", (req, res) => {
  res.json([{ id: 1, name: "Client 1" }]);
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
