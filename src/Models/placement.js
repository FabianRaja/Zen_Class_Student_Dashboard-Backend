import mongoose from "mongoose";

const company=new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    ctc:{
        type:Number,
        required:true,
    },
    placedBy:{
        type:String,
        required:true,
    },
   
});

const placement=mongoose.model("Placements",company);
export {placement};