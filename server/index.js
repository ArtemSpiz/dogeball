import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { faucetRouter } from "./routes/faucet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "DOGEBALL Faucet API is running" });
});

// Routes
app.use("/api/faucet", faucetRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 DOGEBALL Faucet API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
