import { ObjectId } from "mongodb";
import { User } from "../Models/index.js";

export default function addUser(data){
    return User.insertMany(data);
}
export function getUser(email){
    return User.findOne({email});
}
export function findUser(id){
    return User.findOne({_id:id})
}
export function updatePassword(id,password){
    return User.findOneAndUpdate({_id:new ObjectId(id)},{$set:{password}})
}
export function updatePortfolio(id,link){
    return User.findByIdAndUpdate({_id:new ObjectId(id)},{$set:{"portfolio.status":"submitted","portfolio.comment":"Not yet reviewed","portfolio.reviewed":"submitted for review","portfolio.link":link}})
}
export function updateCapstone(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$set:{"capstone.frontendCode":data.frontendCode,"capstone.backendCode":data.backendCode,"capstone.frontendUrl":data.frontendUrl,"capstone.backendUrl":data.backendUrl,"capstone.comments":data.comments,"capstone.status":"Submitted"}})
}
export function leaveSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"leaves.count":1},$set:{"leaves.from":data.from,"leaves.to":data.to,"leaves.reason":data.reason}})
}
export function testimonialSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"testimonial.count":1},$set:{"testimonial.photo":data.photo,"testimonial.video":data.video,"testimonial.description":data.description}})
}
export function querySubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$set:{"query.category":data.category,"query.subCategory":data.subCategory,"query.voice":data.voice,"query.queryTitle":data.queryTitle,"query.queryDescription":data.queryDescription,"query.from":data.from,"query.to":data.to,"query.file":data.file}})
}
export function taskSubmission(data){
    return User.findByIdAndUpdate({_id:new ObjectId(data.id)},{$inc:{"dashboard.tasks.count":1},$set:{"dashboard.tasks.title":data.title,"dashboard.tasks.frontend":data.frontend,"dashboard.tasks.backend":data.backend,"dashboard.tasks.frontendUrl":data.frontendUrl,"dashboard.tasks.backendUrl":data.backendUrl,"dashboard.tasks.comment":data.comment}})
}
