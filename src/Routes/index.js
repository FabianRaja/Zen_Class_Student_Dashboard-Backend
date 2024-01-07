import express from "express";
import bcrypt from "bcrypt";
import addUser, { findUser, getUser, leaveSubmission, querySubmission, taskSubmission, testimonialSubmission, updateCapstone, updatePassword, updatePortfolio } from "../Controllers/index.js";
import { generateToken, isAuthorized } from "../Authorization/auth.js";
import { transport } from "../Mailer/nodemailer.js";
import addUserHistory, { findUserHistory, findUserHistoryAndUpdateForLeaves, findUserHistoryAndUpdateForQuery, findUserHistoryAndUpdateForTask, findUserHistoryAndUpdateForTestimonial } from "../Controllers/data.js";

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
                task:[],
                tasks:{
                    count:0,
                    title:"",
                    frontend:"",
                    backend:"",
                    frontendUrl:"",
                    backendUrl:"",
                    comment:""
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
                from:"",
                to:"",
                reason:"",
                count:0
            },
            testimonial:{
                count:0,
                photo:"",
                video:"",
                description:""
            }
        }
        const user=await addUser(data);
        const userDetails={
            email:req.body.email,
            tasks:[],
            leaves:[],
            testimonial:[]
        }
        const history=await addUserHistory(userDetails);
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
                const link=`https://zenportal.netlify.app/reset/${checkUserData._id}`
                const composeMail={
                    from:"fullstackpurpose@gmail.com",
                    to:req.body.email,
                    subject:"Reset Password Link",
                    html:`
                    <h1>Click this Link to Reset Password</h1><br/>
                    <button style="
                    background-color:blue;
                    border: none;
                    border-radius: 15px;
                    width: 80px;
                    height: 50px;
                  "><a href=${link} style="color:white" >Reset Password</a></button>
                    `
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

router.post("/portfolio",isAuthorized,async(req,res)=>{
    try {
        const portfolioSubmission=await updatePortfolio(req.body._id,req.body.link);
        res.status(200).json({message:"portfolio submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting portfolio"})
        console.log("error submitting portfolio",error)
    }
})

router.post("/capstone",isAuthorized,async(req,res)=>{
    try {
        const capstoneSubmission=await updateCapstone(req.body);
        res.status(200).json({message:"capstone submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting capstone"})
        console.log("error submitting capstone",error)
    }
})

router.post("/leave",isAuthorized,async(req,res)=>{
    try {
        const leaveSubmissionApplication=await leaveSubmission(req.body);
        //for history
        const findUser=await findUserHistory(req.body.email);
        const data={
            from:req.body.from,
            to:req.body.to,
            reason:req.body.reason
        }
        const leaves=findUser.leaves;
        const updating=leaves.push(data);
        const findUpdate=await findUserHistoryAndUpdateForLeaves(findUser._id,leaves);


        res.status(200).json({message:"leave application submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting leave application"})
        console.log("error submitting leave application",error)
    }
})

router.post("/testimonial",isAuthorized,async(req,res)=>{
    try {
        const testimonialSubmissionApplication=await testimonialSubmission(req.body);
        //for history
        const findUser=await findUserHistory(req.body.email);
        const data={
            photo:req.body.photo,
            video:req.body.video,
            description:req.body.description
        }
        const testimonial=findUser.testimonial;
        const updating=testimonial.push(data);
        const findUpdate=await findUserHistoryAndUpdateForTestimonial(findUser._id,testimonial);

        res.status(200).json({message:"testimonial submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting testimonial"})
        console.log("error submitting testimonial",error)
    }
})

router.post("/query",isAuthorized,async(req,res)=>{
    try {
        const querySubmissionForm=await querySubmission(req.body);
        //for history
        const findUser=await findUserHistory(req.body.email);
        const data={
            category:req.body.category,
            subCategory:req.body.subCategory,
            voice:req.body.voice,
            title:req.body.queryTitle,
            description:req.body.queryDescription,
            from:req.body.from,
            to:req.body.to,
            photoUrl:req.body.file
        }
        const query=findUser.query;
        const updating=query.push(data);
        const findUpdate=await findUserHistoryAndUpdateForQuery(findUser._id,query);

        res.status(200).json({message:"query submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting query"})
        console.log("error submitting query",error)
    }
})

router.post("/task",isAuthorized,async(req,res)=>{
    try {
        const taskSubmissionApplication=await taskSubmission(req.body);

         //for history
         const findUser=await findUserHistory(req.body.email);
         const data={
            title:req.body.title,
            frontendSourceCode:req.body.frontend,
            backendSourceCode:req.body.backend,
            frontendUrl:req.body.frontendUrl,
            backendUrl:req.body.backendUrl,
            comments:req.body.comment
         }
         const task=findUser.tasks;
         const updating=task.push(data);
         const findUpdate=await findUserHistoryAndUpdateForTask(findUser._id,task);

        res.status(200).json({message:"task submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting task"})
        console.log("error submitting task",error)
    }
})
export const Router=router;