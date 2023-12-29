import express from "express";
import bcrypt from "bcrypt";
import addUser, { findUser, getUser, updatePassword } from "../Controllers/index.js";
import { generateToken } from "../Authorization/auth.js";
import { transport } from "../Mailer/nodemailer.js";

const router=express.Router();

router.post("/add",async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        const data={
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            number:req.body.number,
            batch:req.body.batch
        }
        const user=await addUser(data);
        res.status(200).json({message:"User added successfully",user:user,token})
    } catch (error) {
        res.status(500).json({message:"User email or phone number already exists"})
        console.log("error adding data")
    }
})

router.get("/login",async(req,res)=>{
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

router.get("/forgot",async(req,res)=>{
    try {
        const checkUserData=await getUser(req.body.email);
        if(!checkUserData){
            return res.status(400).json({message:"User not registered"});
        }else{
                const link=`http://localhost:8080/reset/${checkUserData._id}`
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

export const Router=router;