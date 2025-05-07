import {Request,Response,NextFunction} from "express"

export const globalErrorhandler = (error:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error"

    res.status(statusCode).json({
        status:false,
        message:message
    })

}