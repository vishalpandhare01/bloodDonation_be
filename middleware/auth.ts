import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsing = process.env.JWTSIGNATURE as string;

export  function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.token as string;
    if (!token) {
      return res.status(401).send({
        status: false,
        message: "You Are Not Authenticated Please login",
      });
    }

    Jwt.verify(token, jwtsing, (err, decode) => {
      if (decode) {
        //@ts-ignore
        req.user = decode;
        next();
        return
      }
      return res.status(400).send({
        status: false,
        message: "Your session expired please login again",
      });
    });
  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}

export  function authorization( req: Request,
  res: Response,
  next: NextFunction
){
  try{
    const userId = req.params.userId
    //@ts-ignore
    const loginUserId = req.user.id 
    if(userId === loginUserId){
      next()
    }else{
      return res.status(403).send({status:false,message:'You are not authorized'})

  }
  }catch(err:any){
    return res.status(500).send({ status: false, message: err.message });

  }

}

