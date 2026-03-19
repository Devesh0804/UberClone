import express from 'express'
import UserRouter from './Routes/user.routes.js';
import CaptainRouter from './Routes/captain.routes.js'
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
dotenv.config();



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookie())



app.use('/user',UserRouter);
app.use('/captain',CaptainRouter);



export default app