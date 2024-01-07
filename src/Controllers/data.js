import { ObjectId } from "mongodb";
import { UserDetails } from "../Models/data.js";

//function to add user into the database
export default function addUserHistory(data){
    return UserDetails.insertMany(data);
}

//function to find User using email address
export function findUserHistory(email){
    return UserDetails.findOne({email});
}

//function to add leaves data's to the history collection
export function findUserHistoryAndUpdateForLeaves(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{leaves:data});
}

//function to add testimonial data's to the history collection
export function findUserHistoryAndUpdateForTestimonial(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{testimonial:data});
}

//function to add query data's to the history collection
export function findUserHistoryAndUpdateForQuery(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{query:data});
}

//function to add tasks data's to the history collection
export function findUserHistoryAndUpdateForTask(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{tasks:data});
}