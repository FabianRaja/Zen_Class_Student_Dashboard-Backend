import mongoose from "mongoose";

//creating model schema for the database collection HISTORY
const userData=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    tasks:{
        type:Array
    },
    leaves:{
        type:Array
    },
    query:{
        type:Array
    },
    testimonial:{
        type:Array
    }
});

const UserDetails=mongoose.model("HISTORY",userData);
export {UserDetails};