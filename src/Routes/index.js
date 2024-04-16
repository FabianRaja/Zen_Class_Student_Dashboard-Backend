//imported express to create routers
import express from "express";
//imported bcrypt to hide password
import bcrypt from "bcrypt";
//importing functions from controllers
import addUser, { findUser, getUser, leaveSubmission, querySubmission, taskSubmission, testimonialSubmission, updateCapstone, updatePassword, updatePortfolio } from "../Controllers/index.js";
//importing authorization functions 
import { generateToken, isAuthorized, isAuthorizedLogin } from "../Authorization/auth.js";
//importing transport from nodemailer to send mail
import { transport } from "../Mailer/nodemailer.js";
//importing functions from controllers
import addUserHistory, { findUserHistory, findUserHistoryAndUpdateForLeaves, findUserHistoryAndUpdateForQuery, findUserHistoryAndUpdateForTask, findUserHistoryAndUpdateForTestimonial } from "../Controllers/data.js";

//setting express.Router as router 
const router=express.Router();

//to add a user (or) register user
router.post("/add",async(req,res)=>{
    try {
        //creating salt value using bcrypt
        const salt=await bcrypt.genSalt(10);
        //adding salt and hash values as password using bcrypt
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //creating a data object to create user
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
        //adding new user obj to the database
        const user=await addUser(data);
        //creating a modified obj for history database
        const userDetails={
            email:req.body.email,
            tasks:[],
            leaves:[],
            testimonial:[]
        }
        //adding user to the history database as well
        const history=await addUserHistory(userDetails);
        res.status(200).json({message:"Registration successfull",user})
    } catch (error) {
        res.status(500).json({message:"User email already exists"})
        console.log("error adding data")
    }
})

//to login user
router.post("/login",isAuthorizedLogin,async(req,res)=>{
    try {
        //finding user using email
        const checkUserData=await getUser(req.body.email);
        //if there is a not user with this email it will return as user not registered else continue
        if(!checkUserData){
            return res.status(400).json({message:"User not registered"});
        }else{
            //comparing and validating password using bcrypt
            const validatingPassword=await bcrypt.compare(req.body.password,checkUserData.password);
            //if the password is not matching it will send invalid password as response 
            if(!validatingPassword){
                return res.status(400).json({message:"invalid password"})
            }else{
                //if the password is matching it will create a token using generateToken by importing from jsonwebtoken
                const token=generateToken(checkUserData._id);
                return res.status(200).json({message:"login successful",user:checkUserData,token})
            }
        }
    } catch (error) {
        res.status(500).json({message:error})
        console.log("error login user")
    }
})

//to send reset link to the mail
router.post("/forgot",async(req,res)=>{
    try {
        //find user with email
        const checkUserData=await getUser(req.body.email);
        //if there is no user it will send response as user not registered
        if(!checkUserData){
            return res.status(400).json({message:"User not registered"});
        }else{
            //if the user email is founded it will send a link with id as params
                const link=`https://zenportal.netlify.app/reset/${checkUserData._id}`
                //composing mail to send
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
                //transport is imported from nodemailer to send mail
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

//to reset password
router.post("/reset/:id",async(req,res)=>{
    try {
        //finding user with id from params
        const user=await findUser(req.params.id);
        //creating salt value using bcrypt
        const salt=await bcrypt.genSalt(10);
        //creating hash values and adding salt value to create a password
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //updating password in the database to a particular user
        const update=await updatePassword(req.params.id,hashedPassword)   
        res.status(200).json({message:"Password Reset successfull",user:user.name})
    } catch (error) {
        res.status(500).json({message:"Error resetting password"})
        console.log("error reset password",error)
    }
})

//to submit portfolio
//isAuthorized is imported from Authorization to compare and verify
router.post("/portfolio",isAuthorized,async(req,res)=>{
    try {
        //finding user and updating the portfolio
        const portfolioSubmission=await updatePortfolio(req.body._id,req.body.link);
        res.status(200).json({message:"portfolio submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting portfolio"})
        console.log("error submitting portfolio",error)
    }
})

//to submit capstone
//isAuthorized is imported from Authorization to compare and verify
router.post("/capstone",isAuthorized,async(req,res)=>{
    try {
        //finding user and updating the capstone
        const capstoneSubmission=await updateCapstone(req.body);
        res.status(200).json({message:"capstone submitted successfully"});
    } catch (error) {
        res.status(500).json({message:"error submitting capstone"})
        console.log("error submitting capstone",error)
    }
})

//to submit leave application
//isAuthorized is imported from Authorization to compare and verify
router.post("/leave",isAuthorized,async(req,res)=>{
    try {
        //finding user and updating leave application
        const leaveSubmissionApplication=await leaveSubmission(req.body);
        //adding the data's in the history
        //finding user in the history collection in the database
        const findUser=await findUserHistory(req.body.email);
        const data={
            from:req.body.from,
            to:req.body.to,
            reason:req.body.reason
        }
        const leaves=findUser.leaves;
        const updating=leaves.push(data);
        //finding user and updating the leaves application in the history collection
        const findUpdate=await findUserHistoryAndUpdateForLeaves(findUser._id,leaves);
        res.status(200).json({message:"leave application submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting leave application"})
        console.log("error submitting leave application",error)
    }
})

//to submit testimonial
//isAuthorized is imported from Authorization to compare and verify
router.post("/testimonial",isAuthorized,async(req,res)=>{
    try {
        //to find user and update the testimonial 
        const testimonialSubmissionApplication=await testimonialSubmission(req.body);
        //finding user in the history collection in the database
        const findUser=await findUserHistory(req.body.email);
        const data={
            photo:req.body.photo,
            video:req.body.video,
            description:req.body.description
        }
        const testimonial=findUser.testimonial;
        const updating=testimonial.push(data);
        //finding user and updating the testimonial in the history collection
        const findUpdate=await findUserHistoryAndUpdateForTestimonial(findUser._id,testimonial);

        res.status(200).json({message:"testimonial submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting testimonial"})
        console.log("error submitting testimonial",error)
    }
})

//to submit query
//isAuthorized is imported from Authorization to compare and verify
router.post("/query",isAuthorized,async(req,res)=>{
    try {
        //to find user and update the query
        const querySubmissionForm=await querySubmission(req.body);
        //finding user in the history collection in the database
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
         //finding user and updating the query in the history collection
        const findUpdate=await findUserHistoryAndUpdateForQuery(findUser._id,query);

        res.status(200).json({message:"query submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting query"})
        console.log("error submitting query",error)
    }
})

//to submit task
//isAuthorized is imported from Authorization to compare and verify
router.post("/task",isAuthorized,async(req,res)=>{
    try {
         //to find user and update the task
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
        //finding user and updating the task in the history collection
         const findUpdate=await findUserHistoryAndUpdateForTask(findUser._id,task);

        res.status(200).json({message:"task submitted"});
    } catch (error) {
        res.status(500).json({message:"error submitting task"})
        console.log("error submitting task",error)
    }
})

//exporting router as Router
export const Router=router;