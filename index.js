import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { Router } from "./src/Routes/index.js";
dotenv.config();

//initializing server
const app=express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/",Router);

//listening to the server
app.listen(process.env.PORT,()=>console.log("Server started in PORT ",process.env.PORT));

//connecting DB
connectDB();