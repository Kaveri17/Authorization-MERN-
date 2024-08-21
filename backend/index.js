import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDb.js"

// importing auth.route.js file 
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app =express()
const PORT = process.env.PORT || 8000

//middleware that allows us to parse incoming request :re.body  
app.use(express.json()) 

// api routes being used from auth.route.js 
app.use("/api/auth",authRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port :",PORT )
})