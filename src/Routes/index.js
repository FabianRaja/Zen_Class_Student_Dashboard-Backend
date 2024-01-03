import express from "express";
import bcrypt from "bcrypt";
import addUser, { findUser, getUser, updateCapstone, updatePassword, updatePortfolio } from "../Controllers/index.js";
import { generateToken } from "../Authorization/auth.js";
import { transport } from "../Mailer/nodemailer.js";

const router=express.Router();

router.post("/add",async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const data={
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            batch:"B51 WD Tamil",
            dashboard:{
                attendance:[],
                codekata:[],
                webkata:[],
                tasks:{
                    count:0,
                    links:{}
                }
            },
            capstone:{
                title:"",
                status:"",
                frontendCode:"",
                backendCode:"",
                frontendUrl:"",
                backendUrl:"",
                comments:""
            },
            query:{
                 category:"",
                 subCategory:"",
                 voice:"",
                 queryTitle:"",
                 queryDescription:"",
                 from:"",
                 to:"",
                 file:""
            },
            portfolio:{
                status:"",
                reviewed:"",
                comment:"",
                link:""
            },
            application:"",
            certificate:"",
            interview:"",
            leaves:{
                datas:{},
                count:0
            },
            testimonial:{
                links:{},
                count:0
            }
        }
        const user=await addUser(data);
        res.status(200).json({message:"Registration successfull",user})
    } catch (error) {
        res.status(500).json({message:"User email already exists"})
        console.log("error adding data")
    }
})

router.post("/login",async(req,res)=>{
    try {
        const checkUserData=await getUser(req.body.email);
        if(!checkUserData){
            return res.status(400).json({message:"User not registered"});
        }else{
            const validatingPassword=await bcrypt.compare(req.body.password,checkUserData.password);
            if(!validatingPassword){
                return res.status(400).json({message:"invalid password"})
            }else{
                const token=generateToken(checkUserData._id);
                return res.status(200).json({message:"login successful",user:checkUserData,token})
            }
        }
    } catch (error) {
        res.status(500).json({message:error})
        console.log("error login user")
    }
})

router.post("/forgot",async(req,res)=>{
    try {
        const checkUserData=await getUser(req.body.email);
        if(!checkUserData){
            return res.status(400).json({message:"User not registered"});
        }else{
                const link=`http://localhost:5173/reset/${checkUserData._id}`
                const composeMail={
                    from:"fullstackpurpose@gmail.com",
                    to:"fabiraja21052002@gmail.com",
                    subject:"Reset Password Link",
                    html:`<a href=${link}>Reset</a>`
                }
               transport.sendMail(composeMail,(error,info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log("Mail sent successfully")
                }
               })
               return res.status(200).json({message:"reset link sent to mail"})
        }
    } catch (error) {
        res.status(500).json({message:error})
        console.log("error forgot password")
    }
})

router.post("/reset/:id",async(req,res)=>{
    try {
        const user=await findUser(req.params.id);
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const update=await updatePassword(req.params.id,hashedPassword)   
        res.status(200).json({message:"Password Reset successfull",user:user.name})
    } catch (error) {
        res.status(500).json({message:"Error resetting password"})
        console.log("error reset password",error)
    }
})

router.post("/portfolio",async(req,res)=>{
    try {
        const portfolioSubmission=await updatePortfolio(req.body._id,req.body.link);
        res.status(200).json({message:"portfolio submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting portfolio"})
        console.log("error submitting portfolio",error)
    }
})

router.post("/capstone",async(req,res)=>{
    try {
        const capstoneSubmission=await updateCapstone(req.body);
        res.status(200).json({message:"capstone submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting capstone"})
        console.log("error submitting capstone",error)
    }
})
export const Router=router;