import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/userRoutes.js";
import tranRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
dotenv.config();

//deploy backend on vercel
import serverless from "serverless-http";


const app = express();

const corsOption = {
        origin: ["http://localhost:5173",
                "https://rupayamate.vercel.app"
        ],
        methods: "GET,POST,PUT,DELETE",
        credentials: true
}

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB Connected!!!"))
        .catch((error) => console.log(error));

app.use("/api", route);
app.use("/api/transaction", tranRoutes);

app.use(errorMiddleware);


// const PORT = 8000;
// app.listen(PORT,()=>console.log("Server Started!!!"));

export default serverless(app);
