import  * as jwt from 'jsonwebtoken';
const JWT_SECRET = "thisistoken"

interface tokenPayload{
    user_id:number;    
    email:string
}

 export const signToken = (payload:tokenPayload):string=>{
    if (!JWT_SECRET) {
        throw new Error("JWT secret is missing");
      }
    return jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"})
}

 export const verifyToken = (token:string):tokenPayload=>{
    return jwt.verify(token,JWT_SECRET) as tokenPayload
}



