import express from "express";
import { addTransaction, deleteTransaction, getTransactions, updateTransaction, getTransactionsById } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
const tranRoutes = express.Router();

tranRoutes.post("/", protect, addTransaction);
tranRoutes.get("/", protect, getTransactions);
tranRoutes.get("/:id", protect, getTransactionsById);
tranRoutes.put("/update/:id", protect, updateTransaction);
tranRoutes.delete("/delete/:id", protect, deleteTransaction);

export default tranRoutes;