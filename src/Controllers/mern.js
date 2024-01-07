import { mern } from "../Models/mern.js";
import { placement } from "../Models/placement.js";
import { requirement } from "../Models/requirements.js";

//function to add class data's in the merns collection
export default function addClassDetails(data){
    return mern.insertMany(data);
}

//function to find the class data's in the merns collection
export function getClassDetails(){
    return mern.find({});
}

//function to add the requirements data's in the requirements collection
export function addRequirementsData(data){
    return requirement.insertMany(data);
}

//function to find the requirements data's in the requirements collection
export function getRequirementsData(){
    return requirement.find({});
}

//function to add the placement data's in the placements collection
export function addPlacementsData(data){
    return placement.insertMany(data);
}

//function to find the placement data's in the placements collection
export function getPlacementsData(){
    return placement.find({});
}