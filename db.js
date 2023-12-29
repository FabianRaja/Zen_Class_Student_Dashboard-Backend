import mongoose from "mongoose";

export function connectDB(){
    try {
        mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected")
    } catch (error) {
        console.log(error,"error connecting to db")
    }
}