//importing express to use router
import express from "express";
//importing functions from controller
import addClassDetails, { addPlacementsData, addRequirementsData, getClassDetails, getPlacementsData, getRequirementsData } from "../Controllers/mern.js";

//setting express.Router as router
const router=express.Router();

//to add class data 
router.post("/addClass",async(req,res)=>{
try {
    const getData=await addClassDetails(req.body);
    res.status(200).json({data:getData});
} catch (error) {
    res.status(500).json({message:"Error add class data"})
    console.log("error add class data",error)
}
})

//to find the class data
router.get("/getClass",async(req,res)=>{
    try {
        const getData=await getClassDetails();
        res.status(200).json({message:getData});
    } catch (error) {
        res.status(500).json({message:"Error getting class data"})
        console.log("error get class data",error)
    }
})

//to add requirements data
router.post("/addRequirements",async(req,res)=>{
    try {
        const addData=await addRequirementsData(req.body);
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error add requiements data"})
        console.log("error add requiements data",error)
    }
})
    
//to find requirements data
router.get("/getRequirements",async(req,res)=>{
        try {
            const getData=await getRequirementsData();
            res.status(200).json({message:getData});
        } catch (error) {
            res.status(500).json({message:"Error getting class data"})
            console.log("error get class data",error)
        }
})

//to add placements data
router.post("/addPlacement",async(req,res)=>{
    try {
        const addData=await addPlacementsData(req.body);
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error add placements data"})
        console.log("error add placements data",error)
    }
})

//to find placements data
router.get("/getPlacement",async(req,res)=>{
    try {
        const addData=await getPlacementsData();
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error get placements data"})
        console.log("error get placements data",error)
    }
})

//exporting router as mernRouter
export const mernRouter=router;