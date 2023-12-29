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