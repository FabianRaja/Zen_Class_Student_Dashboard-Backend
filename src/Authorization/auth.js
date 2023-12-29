import jwt from "jsonwebtoken";

//to generate token
export const generateToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY);
}

//custom authorization middleware
export function isAuthorized(req,res,next){
    let token=req.headers["x-auth-token"];
    if(!token){
        res.status(400).json({message:"Access denied"})
    }else{
        //comparing and verifying
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
}