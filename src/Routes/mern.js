import express from "express";
import addClassDetails, { addPlacementsData, addRequirementsData, getClassDetails, getPlacementsData, getRequirementsData } from "../Controllers/mern.js";

const router=express.Router();

router.post("/addClass",async(req,res)=>{
try {
    const getData=await addClassDetails(req.body);
    res.status(200).json({data:getData});
} catch (error) {
    res.status(500).json({message:"Error add class data"})
    console.log("error add class data",error)
}
})

router.get("/getClass",async(req,res)=>{
    try {
        const getData=await getClassDetails();
        res.status(200).json({message:getData});
    } catch (error) {
        res.status(500).json({message:"Error getting class data"})
        console.log("error get class data",error)
    }
})

router.post("/addRequirements",async(req,res)=>{
    try {
        const addData=await addRequirementsData(req.body);
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error add requiements data"})
        console.log("error add requiements data",error)
    }
})
    
router.get("/getRequirements",async(req,res)=>{
        try {
            const getData=await getRequirementsData();
            res.status(200).json({message:getData});
        } catch (error) {
            res.status(500).json({message:"Error getting class data"})
            console.log("error get class data",error)
        }
})

router.post("/addPlacement",async(req,res)=>{
    try {
        const addData=await addPlacementsData(req.body);
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error add placements data"})
        console.log("error add placements data",error)
    }
})

router.get("/getPlacement",async(req,res)=>{
    try {
        const addData=await getPlacementsData();
        res.status(200).json({message:addData});
    } catch (error) {
        res.status(500).json({message:"Error get placements data"})
        console.log("error get placements data",error)
    }
})
export const mernRouter=router;