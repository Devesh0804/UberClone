import express from 'express'
import UserRouter from './Routes/user.routes.js';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
dotenv.config();



const app = express();


app.use(express.json());
app.use(cookie())



app.use('/user',UserRouter);


export default app