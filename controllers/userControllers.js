import {userModel,adminModel} from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// token for user login or not
const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}
// Routes for user login
const loginUser = async(req,resp) =>{
  try{
   const {email,password} = req.body
  //  checkin email is available or not
  if(!email || !password){
    return resp.json({success:false, messasge:'Email and password empty plz fill email and password'})
  }
  const user = await userModel.findOne({email});
  if(!user){
    return resp.json({success:false, messasge: 'This user not find please register first'})
  }
  const match = await bcrypt.compare(password,user.password)
  if(match){
   const token = createToken(user._id);
   resp.json({success: true,token})
  }
  else{
    resp.json({success:false,messasge:'Please enter correct password'})
  }
  }
  catch(error){
  console.log(error)
  resp.json({success:false,messasge: "Server error"})
  }
  
}
// Routes for user registaration
const registerUser = async (req,resp) =>{
  try {
    const {name, email,password} = req.body
    // checking user already exists
    const exists = await userModel.findOne({email});
    if(exists){
      return resp.json({success: false, messasge : "user already exists"})
    }
    // validation email fromat & strong password check
    if(!validator.isEmail (email)){
      return resp.json({success: false, messasge : "Please enter valid email"})
    }
    if(password.length<8){
      return resp.json({success: false, messasge : "Please enter a strong password"})
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    }) 
    const user = await newUser.save()
    const token = createToken(user._id);
    resp.json({success:true,token}) 
  }
  catch(error){
    console.log(error)
    resp.json({success:false,messasge:error.messasge})
  }
}
// routes for admin login 
const adminLogin = async (req,resp) =>{
 try{
  const {email,password} = req.body;
//  check admin exists
   const admin = await adminModel.findOne({email});
   if(!admin){
    return resp.json({success:false,message:'admin not found'})
   }
   const match = await bcrypt.compare(password,admin.password)
   if(!match){
    return resp.json({success:false,message:'Password not found'})
   }
   else{
    const token = createToken(admin._id)
   resp.json({success:true,token})
   }
   
 }
 catch(error){
  resp.json({success:false,message:error.message})
 }
}
// Routes for admin registration 
const adminRegistartion = async(req,resp) =>{
 try{
  const {name,email,password} = req.body;
  // check admin exist is already exist
  const existAdmin = await adminModel.findOne({email});
  if(existAdmin){
  return resp.json({success:false,message:'Admin is already exist'})
  }
  if(!validator.isEmail (email)){
      return resp.json({success: false, messasge : "Please enter valid email"})
    }
    if(password.length<8){
      return resp.json({success: false, messasge : "Please enter a strong password"})
    }
  // hashed password
  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const newAdmin = new adminModel({
      name,
      email,
      password:hashedPassword
    });
    const admin =  await newAdmin.save();
    const token = createToken(admin._id)
    resp.json({success:true,token})
 }
 catch(error){
  resp.json({success:false,message:error.message})
 }
}
export {loginUser,registerUser,adminRegistartion,adminLogin}