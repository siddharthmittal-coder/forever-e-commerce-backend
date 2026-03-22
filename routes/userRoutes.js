import express from 'express'
import { loginUser,adminRegistartion,registerUser,adminLogin } from '../controllers/userControllers.js'
const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/adminLogin',adminLogin)
userRouter.post('/adminRegistration',adminRegistartion)
export default userRouter