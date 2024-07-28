import {} from "express";
import {ADMIN_AUTH} from "../settings";
import {Request, Response, NextFunction} from 'express'



export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const validAuthString = Buffer.from(ADMIN_AUTH).toString('base64');
        const authHeader = req.headers['authorization'] as string // 'Basic XXX'
        if(!authHeader) {
            return res.status(401).json({message:'Anutorizated'})
        }
        if(`Basic ${validAuthString}` !== authHeader) {
           return res.status(401).json({message:'Invalid username or password'})
            ;
        }
       return next()
}
