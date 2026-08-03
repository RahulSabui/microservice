import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { log } from "node:console";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}


export const authMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    const header =
        req.headers.authorization;


    if(!header){
        return res.status(401).json({
            message:"Token missing"
        });
    }


    const token =
        header.split(" ")[1];

    
    if(!process.env.JWT_SECRET){
        return res.status(500).json({ message: "JWT secret not configured" });
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        console.log(decoded, "ooo");
        req.user = decoded;
        next();

    }
    catch(error){

        return res.status(401).json({
            message:"Invalid token"
        });

    }

};