import { validationResult } from "express-validator";
import captainModel from "../Models/captain.model.js";
import creatCaptain from "../Services/Captain.service.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import BlackListToken from "../Models/BlackListtoken.model.js";

dotenv.config();  

export const RegisterCaptain = async (req, res, next) => {
    try {
           const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(400).json({ error: error.array() })
    }

    const { captainFullName, email, password, phoneNo, vehicle } = req.body;
   
    const existUser = await captainModel.findOne({email : email});

    if(existUser){
        res.status(401).json({message : "captain already exist"});
    }



    const hashPassword = await bcrypt.hash(password , 10);

    const captain = await captainModel.create({
        captainFullName : {
       firstName : captainFullName.firstName,
       lastName : captainFullName.lastName,
        },
       email:email,
       password : hashPassword,
       phoneNo :phoneNo,
       vehicle : {
       vehicleType : vehicle.vehicleType,
       vehicleNo : vehicle.vehicleNo,
       capacity : vehicle.capacity
       }
    })
    console.log(captain);
    const token = jwt.sign({_id : captain._id},process.env.JWT_SECRET,{expiresIn:'24h'})
   

    res.status(200).json({token , captain})


    } catch (error) {
        res.status(500).json(error.message);
    } 
 


}



export const captainLogin = async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty){
            res.status(401).json({error: errors.array()});
        }
       
        const {email , password} = req.body;

        const captain = await captainModel.findOne({email : email});
       
        if(!captain){
            res.status(404).json({message:"invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password,captain.password);
        

        if(!isMatch){
          res.status(404).json({message:"invalid email or password"});
        }

        const token = jwt.sign({_id:captain._id},process.env.JWT_SECRET,{expiresIn:"24h"});
       
        if(!token){
            res.status(401).json({message:"unauthorized access"})
        }

        res.cookie('token',token);

        res.status(200).json({token ,captain})

        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


export const CaptainProfile = (req,res,next)=>{
    const captain = req.captain;
     const firstName =  captain.captainFullName.firstName;
    const LastName =   captain.captainFullName.lastName;
    const fullName = firstName + " " + LastName;
     res.send(`Hello Captain ${fullName}`);
}



export const captainLogout = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        
        await BlackListToken.create({token : token});
        res.clearCookie('token');

        res.status(401).json({message : "captain loggedOut successfully"});
    } catch (error) { 
        
        res.status(500).json({message : error.message})
    } 
}