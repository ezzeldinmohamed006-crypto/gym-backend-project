import type {Request,Response,NextFunction} from "express"

export const logger=(req:Request,res:Response,next:NextFunction)=>{

    
    const my_date= new Date().toString();
    console.log(`[${my_date}] ${req.method} ${req.originalUrl} `);

    next();
}