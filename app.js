import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/user_routes.js'
import cors from 'cors'

const app = express()
const port =3001;
app.use(cors());
app.use(bodyParser.json())
app.use(userRoutes)
app.listen(port,()=>{
    console.log("server listeing in 3000");
    
})