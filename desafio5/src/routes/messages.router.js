import { Router } from "express";
import messageModel from "../dao/models/message.model.js";
const router= Router();

router.get('/messages',async (req,res)=>{
    try {
        let messages=await messageModel.find().lean()
        res.render('chat',{
            
            messages : messages
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/messages', async(req,res)=>{
    let {user, message}= req.body
    if (!user|| !message){
        res.send({status:"error",error:"faltan parametros"})
    }
    let result=await messageModel.create({user,message})
    res.redirect('/messages')
})
router.get('/messages/:messid', async (req, res) => {
    try {
        const { messid } = req.params
        await messageModel.findByIdAndDelete(messid)
        
        res.redirect('/messages')
    } catch (error) {
        console.error('Error al eliminar el producto:', error)
        res.status(500).render('error', { message: 'Error al eliminar el producto.' })
    }
})


export default router;