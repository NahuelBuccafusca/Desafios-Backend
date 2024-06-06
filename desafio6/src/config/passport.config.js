import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'
import userService from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy= local.Strategy

const initializePassport=()=>{
    passport.use('github', new GitHubStrategy({
        clientID: "Iv23lilsE0kIH3PSRTC3",
        clientSecret: "4f86a3dd02e2b89dd416588a72afb8f1b927b382",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    userName: profile._json.name,
                    userLastname: "",
                    email: profile._json.email,
                    password: ""
                }
                let result = await userService.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    // passport.use('register',new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req,username,password,done)=>{
    //     const{userName,userLastname,email}=req.body
    //     try {
    //         let user= await userService.findOne({email:username})
    //         if(user){
    //             console.log("el usuario ya existe")
    //             return done(null,false)
    //         }
    //         const newUser={
    //             userName,
    //             userLastname,
    //             email,
    //             password:createHash(password)
    //         }
    //         let result=await userService.create(newUser)
    //         return done(null,result)
    //     } catch (error) {
    //         return done ("Errror al obtener el usuario"+ error)
            
    //     }
    // }))
    passport.serializeUser((user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let user= await userService.findById(id)
        done(null,user)
    })
//     passport.use('login',new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
//         try {
//             const user= await userService.findOne({email:username})
// if (!user){
//     console.log("el usuario no existe")
//     return done(null,user)
// }      
// if(!isValidPassword(user,password))  return done (null,false)
//     return done (null, user)    
//         } catch (error) {
//             return done(error)
            
//         }
//     }))
}
export default initializePassport