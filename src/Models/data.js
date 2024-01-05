import mongoose from "mongoose";

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

const UserDetails=mongoose.model("usersData",userData);
export {UserDetails};