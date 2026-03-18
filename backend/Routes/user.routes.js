import express from 'express';
import { userRegister } from '../Cottroler/user.controllers.js';
import { body } from 'express-validator';

const router = express.Router();



router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min : 3}).withMessage('Name must be atleat  3 charcater'),
    body('phoneNo').isLength({min:10}).withMessage('Contact no must be valid'),
    body('password').isLength({min : 6}).withMessage('Name must be atleat 6 charcater')
],
 userRegister
)


export default router;