import {Router} from 'express';
import User from '../../dao/models/user.model.js'

const router= Router();
router.post('/register',async(req,res)=>{
    const {userName,userLastname,email,password}=req.body;
    try {
        const newUser= new User ({userName,userLastname,email,password});
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.status (500).send('error al registrar usuario');
        
    }
});


router.post('/login',async (req,res)=>{
    const {email, password}=req.body;
    console.log(email,password)
    try {
        const user=await User.findOne({email});
        console.log(user)
        if(!user) return res.status(404).send('Usuario no encontrado');
        req.session.user={
            id: user._id,
            userName: user.userName,
            userLastname: user.userLastname,
            email: user.email,
        }
        console.log(req.session.user)
        res.redirect('/products')
        if (user.email==="adminCoder@coder.com"){
            res.redirect('/admin')
        }
        
    } catch (error) {
        res.status (500).send('error al iniciaar sesion');

    }

});
router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(500).send('error al cerrar sesion')
            res.redirect('/login');
    })
});
export default router;