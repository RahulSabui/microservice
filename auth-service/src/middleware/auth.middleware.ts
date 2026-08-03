import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";


export const authMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Authorization token missing"
            });
        }

        if(Array.isArray(authHeader)){
            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            });
        }
        const decoded = verifyAccessToken(token);
        if(typeof decoded === "string"){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });
        }
        req.user = {
            id: decoded.id as number,
            email: decoded.email as string
        };
        next();
    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }
};