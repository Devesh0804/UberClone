import UserModel from "../Models/UserModel.js";



const creatUser = async ({ firstName,lastName,email,password,phoneNo})=>{
  
    const user = UserModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        phoneNo,
        password
    })




   
}


export default creatUser