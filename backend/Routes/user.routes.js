import express from 'express';
import { getUserProfile, logoutUser, userLogin, userRegister } from '../Cottroler/user.controllers.js';
import { body } from 'express-validator';
import userAuth from '../middlewares/auth.js';

const router = express.Router();



router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min : 3}).withMessage('Name must be atleat  3 charcater'),
    body('phoneNo').isLength({min:10}).withMessage('Contact no must be valid'),
    body('password').isLength({min : 6}).withMessage('password must be atleat 6 charcater')
],
 userRegister
)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleat 6 charcater')
],userLogin)


router.get('/profile',userAuth,getUserProfile)

router.get('/logout',userAuth,logoutUser)


export default router;