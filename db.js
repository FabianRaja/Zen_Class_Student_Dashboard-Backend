//importing mongoose
import mongoose from "mongoose";

//function to connect to the database
export function connectDB(){
    try {
        //passing connection string to the mongoose.connect from .env file
        mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected")
    } catch (error) {
        console.log(error,"error connecting to db")
    }
}