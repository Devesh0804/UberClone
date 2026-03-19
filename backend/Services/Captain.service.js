import captainModel from "../Models/captain.model.js";



const creatCaptain = async({
    firstName,lastName,email,password,phoneNo,
    vehicleType,vehicleNo,capacity
})=>{

    if(!firstName || !email || !password || !phoneNo  || !vehicleNo || !vehicleType || !capacity){
        throw new Error('All fields are require');
    }

    const captain = await captainModel.create({
        captainFullName : {
            firstName,
            lastName
        },
        email,
        password,
        phoneNo,
        vehicle:{
            vehicleType,
            vehicleNo,
            capacity

        }
    })
    // console.log('captain from service',captain)
    return captain;

}



export default creatCaptain;