import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/user_routes.js'


const app = express()
const port =3000;
app.use(bodyParser.json())
app.use(userRoutes)
app.listen(port,()=>{
    console.log("server listeing in 3000");
    
})