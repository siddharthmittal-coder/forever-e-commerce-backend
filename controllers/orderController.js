import orderModel from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'
// placing order using COD //
 const placeOrder = async(req,resp) =>{
  try {
    const {userId,amount,address,items} = req.body
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod:'COD',
      payment:false,
      Date:Date.now()
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    resp.json({success:true,message:'Order placed'})
  } catch (error) {
    console.log(error)
    resp.json({success:false,message:error.message})
  }
 }
 // placing order using stripe /
 const placeOrderStripe = async(req,resp) =>{
  
 }
 // placing order using Razarpay /**
 const placeOrderRazorPay = async(req,resp) =>{
  
 }
//  All orders data for Admin Panel
const allOrders = async(req,resp) =>{
 try {
  const orders = await orderModel.find({})
  resp.json({success:true,orders})

 } catch (error) {
  console.log(error)
  resp.send({success:false,message:error.message})
 }
}
// User Order data from frontend
const userOrders = async(req,resp) =>{
try {
  const {userId} = req.body
  const orders = await orderModel.find({userId})
  resp.send({success:true,orders})
} catch (error) {
  console.log(error)
  resp.send({success:false,message:error.message})
}
}
// update order status from Admin panel
const updateStatus = async(req,resp) =>{
try {
  const {orderId,status} = req.body
  await orderModel.findByIdAndUpdate( orderId,{status})
  resp.json({success:true,message:'Status updated'})
} catch (error) {
  console.log(error)
  resp.send({success:false,message:error.message})
}
}
export {placeOrder,placeOrderRazorPay,placeOrderStripe,userOrders,allOrders,updateStatus}