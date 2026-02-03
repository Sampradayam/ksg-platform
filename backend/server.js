import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import healthRoutes from "./routes/health.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const API_VERSION = "v1";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

// Health check endpoints (versioned)
app.use(`/api/${API_VERSION}/health`, healthRoutes);

// Legacy health endpoint (for backward compatibility)
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "Please use /api/v1/health for detailed health information"
  });
});

// API routes (versioned)
app.use(`/api/${API_VERSION}`, routes);

// Legacy API routes (for backward compatibility)
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "KSG Platform API",
    version: API_VERSION,
    endpoints: {
      health: `/api/${API_VERSION}/health`,
      api: `/api/${API_VERSION}`
    }
  });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on port ${PORT}`),
);
