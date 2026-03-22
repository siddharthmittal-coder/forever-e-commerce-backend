import express from 'express'
import { placeOrderRazorPay,placeOrder,placeOrderStripe,userOrders,updateStatus,allOrders } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js'
const orderRoutes = express.Router();
// payment feauters
orderRoutes.post('/place',authUser,placeOrder)
orderRoutes.post('/stripe',authUser,placeOrderStripe)
orderRoutes.post('/razorpay',authUser,placeOrderRazorPay)
// admin feature
orderRoutes.post('/list',adminAuth,allOrders)
orderRoutes.post('/status',adminAuth,updateStatus)
// user features
orderRoutes.post('/userorder',authUser,userOrders)
export default orderRoutes