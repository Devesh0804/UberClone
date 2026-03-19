import mongoose from "mongoose";

const captainSchema  = new mongoose.Schema({
    captainFullName :{
        firstName : {
            type:String,
            require :true
             
        },
           lastName : {
            type:String,
            require :true  
        }
    },email:{
        type:String,
        require:true,
        usnique:true,
        match : [/^|S+@|S+|.|S+$/, 'Please enter a valid email']
    },
    password :{
        type : String,
        require : true,
        unique : true
    },
    phoneNo :{
        type : String,
        require:true,
        unique : true
    },
    vehicle :{
        vehicleType : {
              type : String,
              require : true,
              enum:['car','motorcyle','auto']
        },
        vehicleNo:{
              type : String,
              require : true,
              

        },
        capacity : {
            type : String,
            require : true,
            min : [1, 'Capacity must be atleast 1']
        }

    },
    status:{
        type : String,
        enum : ['active' , 'inactive'],
        default : 'inactive'
    },
    location:{
        latitude :{
            type : Number
        },
        longitude:{
            type : Number
        }
    }
})



const captainModel = mongoose.model('captain' , captainSchema);

export default captainModel;