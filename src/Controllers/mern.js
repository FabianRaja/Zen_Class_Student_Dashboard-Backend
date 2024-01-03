import { mern } from "../Models/mern.js";
import { placement } from "../Models/placement.js";
import { requirement } from "../Models/requirements.js";

export default function addClassDetails(data){
    return mern.insertMany(data);
}

export function getClassDetails(){
    return mern.find({});
}

export function addRequirementsData(data){
    return requirement.insertMany(data);
}

export function getRequirementsData(){
    return requirement.find({});
}

export function addPlacementsData(data){
    return placement.insertMany(data);
}

export function getPlacementsData(){
    return placement.find({});
}