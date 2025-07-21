import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mcp } from "./mcp.js";

// Load environment variables like your RETELL_API_KEY
dotenv.config();

// Initialize the express web server application
const app = express();

// Middleware setup
app.use(cors()); // Allows other websites (like your GPT) to call this server
app.use(express.json()); // Allows the server to understand JSON requests

// Health check route for Render to confirm the server is running
app.get("/", (req, res) => {
  res.status(200).send("OK - Retell MCP Web Server is running.");
});

// The main MCP endpoint that your GPT will use
app.use("/mcp", mcp);

// Use the port provided by Render's environment, or 8000 if running locally
const PORT = process.env.PORT || 8000;

// Listen on 0.0.0.0 to be accessible in Render's cloud environment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running and listening for web requests on port ${PORT}`);
});

