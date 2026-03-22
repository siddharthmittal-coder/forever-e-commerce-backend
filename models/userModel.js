import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {type: String,required: true},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  cartData: {type:Object,default: {}},

}, {minimize: false})
const adminSchema = new mongoose.Schema({
  name : {type: String,required: true},
  email:{type: String, unique:true,require:true},
   password:{type:String,required:true},
   role:{type:String,default:"admin"}
})
const adminModel = mongoose.model.admin || mongoose.model('admin',adminSchema)
const userModel = mongoose.model.user || mongoose.model('user',userSchema)
export {userModel,adminModel}