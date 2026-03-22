import { userModel } from "../models/userModel.js"

// add Products to user cart
const addToCart = async (req,resp) =>{
try {
  const {userId,itemId,size} = req.body
  const userData = await userModel.findById(userId)
  let cartData = await userData.cartData;
  if(cartData[itemId]){
    if(cartData[itemId][size]){
      cartData[itemId][size] +=1;
    }
    else{
      cartData[itemId][size] = 1
    }
  } else{
    cartData[itemId] = {}
    cartData[itemId][size] = 1
  }
  await userModel.findByIdAndUpdate(userId,{cartData})
  resp.json({success:true,message:'Add To Cart'})
} catch (error) {
  console.log(error)
  resp.json({success:false,message:error.message})
}
}
// update  user cart
const updateCart = async (req,resp) =>{
 try {
  const {userId,size,quantity,itemId} = req.body
  const userData = await userModel.findById(userId)
  let cartData = await userData.cartData;
  cartData[itemId][size] = quantity
  await userModel.findByIdAndUpdate(userId,{cartData})
  resp.json({success:true,message:'Cart Updated'})
 } catch (error) {
  console.log(error)
  resp.json({success:false,message:error.message})
 }
}
// get  user cart
const getUserCart = async (req,resp) =>{
 try {
  const {userId} = req.body
  const userData = await userModel.findById(userId)
  let cartData = await userData.cartData;
  resp.json({success:true,cartData})
 } catch (error) {
  
 }
}
export {addToCart,updateCart,getUserCart}