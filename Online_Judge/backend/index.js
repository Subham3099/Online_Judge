const express = require('express')
const {DBConnection} = require('./database/db.js')
const User = require('./models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {generateFile} = require("./generateFile.js")
const {executeCpp} = require("./executeCpp.js")
const { v4: uuid } = require('uuid')
const path = require('path')
const app = express()

dotenv.config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


DBConnection()
app.get("/",(req,res)=>{
    res.send("Hola")
});

app.post("/register",async (req,res)=>{
    console.log(req)
    try{
        const {firstname,lastname,email,password} = await req.body
        console.log(req.body)
        console.log(firstname + " " + lastname + " " + email + " " + password)
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Enter all fields")
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).send("User already exists!!!")
        }

        const hashPassword = await bcrypt.hashSync(password,10);
        console.log(hashPassword);

        const user = await User.create({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : hashPassword
        });

        const token = jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
            expiresIn:"1d"
        })
        user.token = token
        user.password = undefined
        res.status(201).json({
            message:"Signup Successful",
            success: true,
            token
        })
    }
    catch(error){
        console.log("Error : "+error)
    }
})

app.post("/login",async (req,res)=>{

    try{

        const {email,password} = req.body

        if(!(email && password)){
            return res.status(400).send("Enter all fields")
        }

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).send("User not found")
        }

        const enteredPassword = await bcrypt.compare(password,user.password)

        if(!enteredPassword){
            return res.status(400).send("Incorrect Password")
        }

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{
            expiresIn: "1d"
        })

        user.token = token
        user.password = undefined

        const options = {
            expires: new Date(Date.now()+ 1*24*60*60*1000),
            httpOnly: true
        }

        res.status(200).cookie("token",token,options).json({
            message:"Login Successful",
            success: true,
            token:token
        })

    }catch(error){
        console.log("Login : "+ error.message)
    }
})

app.post("/runtest",async (req,res)=>{
    const {language,code,testcase} = req.body
    if(code==undefined){
        return res.status(400).json({success:false,message:"Empty code body!"})
    }

    try{
        
        const filePath = await generateFile(language,code,'codes','')
        const jobId = path.basename(filePath).split(".")[0]
        const testcasePath = await generateFile('txt',testcase,'outputs',jobId)
        const output = await executeCpp(filePath,testcasePath)
        console.log(output)
        res.status(200).json({output : output})

    }catch (error){
        res.status(200).json({success:false,output:"Error: "+error.message})
    }
})

app.listen(8000,()=>{
    console.log("Good")
});