import mongoose from "mongoose";

const requirements=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    ctc:{
        type:String,
        required:true,
    },
    nature:{
        type:String,
        required:true,
    },
    opening:{
        type:String,
        required:true,
    },
    deadline:{
        type:String,
        required:true,
    },
    program:{
        type:String,
        required:true,
    },
});

const requirement=mongoose.model("Requirements",requirements);
export {requirement};