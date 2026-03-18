import express from 'express'
import UserRouter from './Routes/user.routes.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/user',UserRouter);


export default app