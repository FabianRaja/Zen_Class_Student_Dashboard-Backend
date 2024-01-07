import { ObjectId } from "mongodb";
import { User } from "../Models/index.js";

//function to add user to the Students collection
export default function addUser(data){
    return User.insertMany(data);
}

//function to find the user using email in the Students collection
export function getUser(email){
    return User.findOne({email});
}

//function to find the user using id in the Students collection
export function findUser(id){
    return User.findOne({_id:id})
}

//function to find the user using id and update the password in the Students collection
export function updatePassword(id,password){
    return User.findOneAndUpdate({_id:new ObjectId(id)},{$set:{password}})
}

//function to find the user using id and update portfolio data's in the Students collection
export function updatePortfolio(id,link){
    return User.findByIdAndUpdate({_id:new ObjectId(id)},{$set:{"portfolio.status":"submitted","portfolio.comment":"Not yet reviewed","portfolio.reviewed":"submitted for review","portfolio.link":link}})
}

//function to find the user using id and update capstone data's in the Students collection
export function updateCapstone(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$set:{"capstone.frontendCode":data.frontendCode,"capstone.backendCode":data.backendCode,"capstone.frontendUrl":data.frontendUrl,"capstone.backendUrl":data.backendUrl,"capstone.comments":data.comments,"capstone.status":"Submitted"}})
}


//function to find the user using id and update leave data's in the Students collection
export function leaveSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"leaves.count":1},$set:{"leaves.from":data.from,"leaves.to":data.to,"leaves.reason":data.reason}})
}

//function to find the user using id and update testimonial data's in the Students collection
export function testimonialSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"testimonial.count":1},$set:{"testimonial.photo":data.photo,"testimonial.video":data.video,"testimonial.description":data.description}})
}

//function to find the user using id and update query data's in the Students collection
export function querySubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$set:{"query.category":data.category,"query.subCategory":data.subCategory,"query.voice":data.voice,"query.queryTitle":data.queryTitle,"query.queryDescription":data.queryDescription,"query.from":data.from,"query.to":data.to,"query.file":data.file}})
}

//function to find the user using id and update task data's in the Students collection
export function taskSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"dashboard.tasks.count":1},$set:{"dashboard.tasks.title":data.title,"dashboard.tasks.frontend":data.frontend,"dashboard.tasks.backend":data.backend,"dashboard.tasks.frontendUrl":data.frontendUrl,"dashboard.tasks.backendUrl":data.backendUrl,"dashboard.tasks.comment":data.comment}})
}
