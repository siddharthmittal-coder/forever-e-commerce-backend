import jwt from 'jsonwebtoken'
const adminAuth = async (req,resp,next) =>{
  try{
    const {token} = req.headers
    if(!token){
      return resp.json({success:false,message:'Not Authorized Login again'})
    }
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    req.adminId = token_decode.id;
    next();
  }
  catch(error){
    resp.json({success:false,message:error.message})
  }
}
export default adminAuth