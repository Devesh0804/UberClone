import UserModel from "../Models/UserModel.js";
import dotenv from 'dotenv'
import { validationResult } from "express-validator";
import creatUser from "../Services/user.service.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import BlackListToken from "../Models/BlackListtoken.model.js";

dotenv.config();

export const userRegister = async (req, res, next) => {


    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({ error: error.array() })
        }

        const { fullName: { firstName, lastName }, email, phoneNo, password } = req.body;


        const hashPassword = await UserModel.hashPassword(password)

        if (!firstName || !email || !password || !phoneNo) {
            return res.status(400).json({ error: 'All fields are required' })
        }


        const existUser = await UserModel.findOne({ email: email })
        if (existUser) {
            res.status(400).json({ message: "user already exist" });
        }

        const user = await UserModel.create({ fullName: { firstName, lastName }, email, phoneNo, password: hashPassword })


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)




        res.status(200).json({ token, user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}



export const userLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(400).json({ error: errors.array() })
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email }).select('+password');
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await user.ComparePassword(password);

    if (!isMatch) {
        res.status(401).json({ message: "Invalid password " })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn : "24h"})
    
     res.cookie('token',token);

    res.status(200).json({ token, user })
}



export const getUserProfile = async (req,res,next) =>{
     const firstName =  req.user.fullName.firstName;
    const LastName =   req.user.fullName.lastName;
    const fullName = firstName + " " + LastName;
     res.send(`Hello ${fullName}`);
}



export const logoutUser = async(req,res,next)=>{
     

     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
     
     await BlackListToken.create({token})
     res.clearCookie('token');

     res.status(200).json({message:"logged Out"});

}