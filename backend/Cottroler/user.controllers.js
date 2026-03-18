import UserModel from "../Models/UserModel.js";
import dotenv from 'dotenv'
import { validationResult } from "express-validator";
import creatUser from "../Services/user.service.js";
import jwt from 'jsonwebtoken';


dotenv.config();

export const userRegister = async (req, res, next) => {
    

try {
        const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(400).json({ error: error.array() })
    }

    const { fullName :  { firstName, lastName }, email, phoneNo, password } = req.body;
    

    const hashPassword = await UserModel.hashPassword(password)
 
      if(!firstName || !email || !password || !phoneNo){
            return res.status(400).json({error : 'All fields are required'})
        }


       const existUser = await UserModel.findOne({email : email})
      if(existUser){
        res.status(400).json({message : "user already exist"});
      }
    
     const user =  await UserModel.create({firstName, lastName, email, phoneNo, password: hashPassword})

   
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)



    
    res.status(200).json({ token , user })
    
} catch (error) {
     res.status(500).json({message : error.message})
}

}