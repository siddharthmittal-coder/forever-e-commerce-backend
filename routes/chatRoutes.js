import express from 'express'
import OpenAI from 'openai'
const router = express.Router()
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
})
router.post("/chat",async(req,resp) =>{
   const userMessage = req.body.message
   const response = await openai.chat.completions.create({
     model: 'gpt-4o-mini',
     messages: [
      {role:"system",content:'You are AI shopping asssitant for an e-commerce website'},
      {role: "user",content: userMessage}
     ]
   })
   resp.json({reply : response.choices[0].message.content})
})
export default router