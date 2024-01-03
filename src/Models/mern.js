import mongoose from "mongoose";

const mernData=new mongoose.Schema({
    heading:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    content1:{
        type:String,
    },
    content2:{
        type:String,
    },
    content3:{
        type:String,
    },
    content4:{
        type:String,
    },
    content5:{
        type:String,
    },
    content6:{
        type:String,
    },
    content7:{
        type:String,
    },
    read1:{
        type:String,
    },
    read2:{
        type:String,
    },
    task:{
        type:String,
    }
});

const mern=mongoose.model("Mern",mernData);
export {mern};