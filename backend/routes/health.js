import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check endpoint for monitoring and deployment verification
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    const isHealthy = dbStatus === "connected";

    // Get system info
    const healthCheck = {
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      database: {
        status: dbStatus,
        name: mongoose.connection.name || "unknown"
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: "MB"
      }
    };

    // Return appropriate status code
    const statusCode = isHealthy ? 200 : 503;
    res.status(statusCode).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

/**
 * @route   GET /api/v1/health/ready
 * @desc    Readiness probe for Kubernetes/container orchestration
 * @access  Public
 */
router.get("/ready", async (req, res) => {
  try {
    // Check if app is ready to serve traffic
    const dbReady = mongoose.connection.readyState === 1;

    if (dbReady) {
      res.status(200).json({
        status: "ready",
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: "not ready",
        timestamp: new Date().toISOString(),
        reason: "Database not connected"
      });
    }
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

/**
 * @route   GET /api/v1/health/live
 * @desc    Liveness probe for Kubernetes/container orchestration
 * @access  Public
 */
router.get("/live", (req, res) => {
  // Simple liveness check - if this responds, the app is alive
  res.status(200).json({
    status: "alive",
    timestamp: new Date().toISOString()
  });
});

export default router;
