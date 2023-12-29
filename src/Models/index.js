import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
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
    number:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
    },
    batch:{
        type:String,
        required:true,
        trim:true,
    }
   
});

const User=mongoose.model("dsfdsfsdf",userSchema);
export {User};