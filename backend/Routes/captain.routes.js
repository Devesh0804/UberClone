import express from 'express'
import { body, ExpressValidator } from 'express-validator';
import { captainLogin, captainLogout, CaptainProfile, RegisterCaptain } from '../Cottroler/captaion.controller.js';
import userAuth from '../middlewares/auth.js';
import captainAuth from '../middlewares/CaptainAuth.js';


const router = express.Router();


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('captainFullName.firstName').isLength({min : 3}).withMessage('Name must be atleat  3 charcater'),
    body('phoneNo').isLength({min:10}).withMessage('Contact no must be valid'),
    body('password').isLength({min : 6}).withMessage('password must be atleat 6 charcater'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid'),
    body('vehicle.vehicleNo').isLength({min : 3}).withMessage('Vehicle no should be valid'),
    body('vehicle.capacity').isLength({min : 1}).withMessage('Capacity must be at least 1')

],RegisterCaptain)





router.post('/login',[
     body('email').isEmail().withMessage('Invalid email'),
     body('password').isLength({min:6}).withMessage('password must be atleat 6 charcater')
],
captainLogin)


router.get('/profile',captainAuth,CaptainProfile)


router.get('/logout',captainLogout);








export default router;