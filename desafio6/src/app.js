import express from 'express'
import mongoose from 'mongoose'
import handlebars from'express-handlebars'
import __dirname from './utils.js';
import dotenv from "dotenv"
import indexRouter from './routes/index.router.js'
import userRouter from'./routes/users.router.js'
import messageRouter from './routes/messages.router.js'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import FileStore from 'session-file-store';
import viewsRouter from'./routes/views.js'
import sessionsRouter from './routes/api/sessions.router.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express()
const PORT = 8080
const FileStoreInstance= FileStore(session)
dotenv.config();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Conectado a la base de datos")})
.catch(error => console.error("Error en la conexión", error))

app.use(session({
    store: new FileStoreInstance({path:'./session', ttl:100, retries:0}),
    secret:'secretkey',
    resave:false,
    saveUnitialized:true,
    store:MongoStore.create({mongoUrl:'mongodb+srv://nahuel:2024@nahuelcluster.wm5es1n.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=nahuelcluster',
        ttl:100
    }),
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())




app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)

// mongoose.connect(process.env.MONGO_URL).then(() => {
//         console.log("Conectado a la base de datos")})
//     .catch(error => console.error("Error en la conexión", error))
// app.use('/', indexRouter)
// app.use('/', userRouter)
// app.use('/', messageRouter)
// app.use('/', cartRouter)
// app.use('/', productRouter)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}
)