import { Router } from "express";
import userModel from "../dao/models/user.model.js";
const router= Router();

router.get('/',async (req,res)=>{
    try {
        let users=await userModel.find()
        res.send({result:"success", payload:users})
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async(req,res)=>{
    let {userName,userLastname,email}= req.body
    if (!userName|| !userLastname || !email){
        res.send({status:"error",error:"faltan parametros"})
    }
    let result=await userModel.create({userName,userLastname,email})
    res.send({result:"success", payload:result})
})
router.put('/api/users/:uid', async (req, res) => {
    let { uid } = req.params

    let userToReplace = req.body

    if (!userToReplace.name || !userToReplace.last_name || !userToReplace.email) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    let result = await userModel.updateOne({ _id: uid }, userToReplace)

    res.send({ result: "success", payload: result })
})

router.delete('/api/users/:uid', async (req, res) => {
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})




export default router;