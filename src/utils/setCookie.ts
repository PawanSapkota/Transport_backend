import {Response} from "express";


export const setCookie = (res:Response,token)=>{
    res.cookie(token,"secret_token",{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
   
}