import {Router} from 'express';
import passport from 'passport';
const router= Router();

// router.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})


// router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),async(req,res)=>{
//     req.session.user=req.user
//     res.redirect("/")
// })
router.post('/register',passport.authenticate('register',{failureRedirect:'failregister'}),async(req,res)=>{
    res.send({status:"success",message:"usuario registrado"})
});

router.get('/failregister',async(req,res)=>{
    console.log("estrategia fallida")
    res.send({error:"Falló"})
})


router.post('/login',passport.authenticate('login',{failureRedirect:'faillogin'}),async (req,res)=>{
    if(!req.user) return res.status(400).send({status:"error",error:"datos incompletos"})
    try {
            req.session.user={
            first_name:req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
        }
        console.log(req.session.user)
        
       
        
    } catch (error) {
        res.status (500).send('error al iniciaar sesion');

    }

});
router.get('/faillogin',(req,res)=>{
    res.send({error:"login fallido"})
})

router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(500).send('error al cerrar sesion')
            res.redirect('/login');
    })
});

router.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user })
    } else {
        res.status(401).json({ message: 'No estás autenticado' })
    }
})

export default router;