import {Request,Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { signToken } from "../utils/jwt";
import { setCookie } from "../utils/setCookie";
const AuthRepo = AppDataSource.getRepository(User)


export const login = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const {email,password} = req.body;

      const existingUser = await AuthRepo.findOneBy({email});

      if(!existingUser){
        next(new AppError(404,"User not found"));
      }
      if(!await comparePassword(password,existingUser.password)){
        next(new AppError(401,"Invalid credentials"))
      }
      const token = signToken({
        user_id:existingUser.id,
        email:existingUser.email
      });
      setCookie(res, token);
      res.status(200).json({
        status:"Success",
        message:"User logged in successfully!!",
        token,
        user:{
            id:existingUser.id,
            email:existingUser.email
        }
       }) 
    }
    catch(error){
        next(new AppError(401,error.message))
    }
}

export const registerUser = async(req: Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password,full_name} = req.body;

    const existingUser = await AuthRepo.findOneBy({ email });

    if(existingUser){
      return next(new AppError(409,"Email already registered!!"))
    }

    const hashedPassword = await hashPassword(password);

    const newUser = AuthRepo.create({
      full_name,
      email,
      password:hashedPassword
    })

   const savedUser = await AuthRepo.save(newUser);

   const token = signToken({
    user_id:savedUser.id,
    email:savedUser.email
   })
   setCookie(res, token);

   res.status(201).json({
    status:"Success",
    message:"User registered successfully!!",
    token,
    user:{
        id:savedUser.id,
        email:savedUser.email
    }
   })
  }
  catch(error){
    next(new AppError(error.statusCode,error.message))
  }
}