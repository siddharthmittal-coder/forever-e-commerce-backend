import {v2 as clouinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import { json } from 'express'
// Function of add product
const addProduct = async (req,resp) =>{
  try{

  
  const {name,price,description,category,subCategory,size,bestseller} = req.body
  
  const image1 = req.files.image1 && req.files.image1[0]
  const image2 = req.files.image2 && req.files.image2[0]
  const image3 = req.files.image3 && req.files.image3[0]
  const image4 = req.files.image4 && req.files.image4[0]
  const images = [image1,image2,image3,image4].filter((item) =>item !==undefined)
  let imagesUrl = await Promise.all(
    images.map(async (item) =>{
    let result = await clouinary.uploader.upload(item.path,{resource_type: 'image'})
    return result.secure_url
    })
  )
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true"? true : false,
      sizes : size? JSON.parse(size):[],
      image: imagesUrl,
      date: Date.now()
    }
    const product = new productModel(productData)
    await product.save()
    console.log(product);
    
  resp.json({success: true, message: 'Your product are Added '})
  }
 
  catch(error){
   console.log(error)
   resp.json({success:false,message: error.message})
  }

}
// function of totalListproduct
const listProduct = async(req,resp) =>{
    try {
       const products = await productModel.find({});
       resp.json({success: true,products})
    }
    catch(error){
      resp.json({success:false,message: error.message})
    }
}
// function of remove Product
const removeProduct = async(req,resp) =>{
  try{
    await productModel.findByIdAndDelete(req.body.id)
    resp.json({success:true,message:'product removed'})
  }
  catch(error){
   resp.json({success:false,message:error.message})
  };
  
}
// function of add Single product
const  singleProduct = async (req,resp) =>{
  
  try{
  const {productId} = req.body;
  const product =  await productModel.findById(productId)
  if(!product){
    resp.json({success:false,message:'product not found'})
  }
  resp.json({success:true,product})
  }
  catch(error){
    resp.json({success:false,message:error.message})
  }
}
export {addProduct,listProduct,removeProduct,singleProduct}