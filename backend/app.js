import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // Alternative dev server
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

// Health check endpoint
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Restaurant API is running successfully",
    timestamp: new Date().toISOString()
  });
});

// Health check for Render
app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;
