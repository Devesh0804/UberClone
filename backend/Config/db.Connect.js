import mongoose from "mongoose";


const DBConnect = () =>{
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
       console.log('data base connected succesfully')
    }).catch((err)=>{
        console.log(err)
    })
}


export default DBConnect;