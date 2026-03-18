import express from 'express'
import dotenv from 'dotenv'
import app from './app.js';
import DBConnect from './Config/db.Connect.js';
dotenv.config();
DBConnect();


app.listen(process.env.PORT , ()=>{
    console.log(`server started at ${process.env.PORT }`)
})