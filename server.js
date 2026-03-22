import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chatRoute from './routes/chatRoutes.js'
// App config
const app = express();
const port = process.env.PORT || 4000 
connectDB()
connectCloudinary()
// middlewares
app.use(express.json());
app.use(cors())
// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoutes)
app.use('/api',chatRoute)
app.get('/',(req,resp) =>{
  resp.send("Api working")
})
app.listen(port, console.log("Server start at ",port))