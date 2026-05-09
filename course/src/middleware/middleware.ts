import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


export interface JwtPayload {
    userId : string,
    role : string
}


export const authMiddleware = async (req : Request,res : Response,next : NextFunction)=>{

   const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing"
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing after Bearer"
      });
    }

    const decodedJwt = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;

    req.user = decodedJwt
    console.log(decodedJwt)
    next();


}