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