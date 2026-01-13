import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://rupayamate.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Database -------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

/* -------------------- Routes -------------------- */
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

/* -------------------- Error Handler -------------------- */
app.use(errorMiddleware);

/* -------------------- Server -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
