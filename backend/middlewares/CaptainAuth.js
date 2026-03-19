import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
import captainModel from '../Models/captain.model.js';
import BlackListToken from '../Models/BlackListtoken.model.js';
dotenv.config();



const captainAuth = async(req,res,next)=>{
  
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    const isBlackListed = await BlackListToken.findOne({token : token});
    if(isBlackListed){
        res.status(401).json(messag:{"invalid token"})
    }



    if(!token){
        res.status(401).json({message : "unauthorized access"});
    }

    try {
         const decoded = jwt.verify(token , process.env.JWT_SECRET);
         const captain = await captainModel.findById(decoded);

         req.captain = captain;

         return next();
    } catch (error) {
          res.status(500).json({message:error.message})
    }  
}


export default captainAuth;