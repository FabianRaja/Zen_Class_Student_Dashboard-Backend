import mongoose from "mongoose";

//creating model schema for the database collection STUDENTS
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:24,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    dashboard:{
        type:Object
    },
    capstone:{
        type:Object
    },
    query:{
        type:Object
    },
    portfolio:{
        type:Object
    },
    leaves:{
        type:Object
    },
    application:{
        type:String
    },
    certificate:{
        type:String
    },
    interview:{
        type:String
    },
    testimonial:{
        type:Object
    }
});

const User=mongoose.model("STUDENTS",userSchema);
export {User};