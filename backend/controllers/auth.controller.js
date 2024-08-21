import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
// import { generateVerificationCode } from "../utils/generateVerificationCode.js"

export const signup = async (req,res) =>{
    const {email,password,name} = req.body

    try {
        if(!email || !password || !name){
            throw new Error("All the fields are required")
        } 
        const userAlreadyExists = await  User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success:false, message:"User ALready Exists"})
        }
        
        const hashedPassword = await bcryptjs.hash(password,10) //hashing the password
        const verificationToken = Math.floor(1000 + Math.random() * 900000).toString() // created a token

        //created a user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24* 60 * 60 * 1000 // 24 hours
        })
        await user.save(); // saved in database
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export const login = async (req,res) =>{
    res.send("login")
}

export const logout = async (req,res) =>{
    res.send("logout")
}