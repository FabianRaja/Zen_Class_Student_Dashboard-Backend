import { ObjectId } from "mongodb";
import { UserDetails } from "../Models/data.js";

export default function addUserHistory(data){
    return UserDetails.insertMany(data);
}
export function findUserHistory(email){
    return UserDetails.findOne({email});
}
export function findUserHistoryAndUpdateForLeaves(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{leaves:data});
}
export function findUserHistoryAndUpdateForTestimonial(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{testimonial:data});
}
export function findUserHistoryAndUpdateForQuery(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{query:data});
}
export function findUserHistoryAndUpdateForTask(id,data){
    return UserDetails.findOneAndUpdate({_id:new ObjectId(id)},{tasks:data});
}