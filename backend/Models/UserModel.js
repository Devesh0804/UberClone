import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
   fullName: {
      firstName  : {
        type:String,
        require : true,
        minlength : [5, ' Name is Too Short']
    },
    lastName  : {
        type:String,
        minlength : [5, ' Name is Too Short']
    }
   },
    email :{
        type : String,
        require : true,
        unique :true,
        minlength :[5 , "Email must be at least 5 charcters"]
    },
    phoneNo :{
        type : String,
        require :true,
        unique : true,
        minlength : [10 , "Phone no. must be valid"]
    },
    password:{
        type : String , 
        require : true,
        select : false
    },
    socketID  : {
        type : String
    }
})





UserSchema.method.ComparePassword = ( async (password)=>{
  return  bcrypt.compare(password,this.password)
})

UserSchema.statics.hashPassword = ( async (password)=>{
    return await bcrypt.hash(password , 10);
})



const UserModel = mongoose.model('users',UserSchema)


export default UserModel;