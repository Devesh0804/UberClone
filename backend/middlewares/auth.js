import jwt from 'jsonwebtoken'
import BlackListToken from '../Models/BlackListtoken.model.js';
import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


const userAuth = async(req,res,next) =>{
    const token =  req.cookies.token || req.headers.authorization.split(' ')[1];

    const isBlackListed = await BlackListToken.findOne({token : token});
    if(isBlackListed){
        res.status(401).json({message:" Unauthorized access"});
    }
    
      if(!token){
        res.status(401).json({messag:"unauthorized access"})
      }

      try {
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded);
         
        req.user = user;

        return next();
        
      } catch (error) {
        
      }
}


export default userAuth;