import express from "express";
import cors from "cors";
import mongoose  from "mongoose";
import route from "./routes/userRoutes.js";
import tranRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

const corsOption ={
        origin:"http://localhost:5173",
        methods:"GET,POST,PUT,DELETE",
        credential:true
}

app.use(cors(corsOption));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/expense")
        .then(()=>console.log("DB Connected!!!"))
        .catch((error)=>console.log(error));

app.use("/api",route);
app.use("/api/transaction",tranRoutes);

app.use(errorMiddleware);


const PORT = 8000;
app.listen(PORT,()=>console.log("Server Started!!!"));