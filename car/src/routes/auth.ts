import { Router } from "express";
import { prisma } from "../db/db";
import jwt from 'jsonwebtoken'

const router = Router();


router.post('/signup',async(req,res)=>{

   try{
     const { username, password } = req.body

        const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    if(user){
       return res.status(409).json({
            message : "username already exists"
        })
    }

    const User =  await prisma.user.create({
        data : {
            username ,
            password 
        }
    })

    return res.status(200).json({
        success :  true ,
        data : {
            message : "user created successfully",
            userId :  User.id
        }
    })
   }
   catch(e){
    return res.status(400).json({
        e,
        message  : "invalid inputs"
    })
   }


})



router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body

        const user = await prisma.user.findFirst({
            where : {
                username,
                password
            }
        })

        if(!user){
            res.status(401).json({
                success : false,
                message : "user does not exists"
            })
        }

        const token = jwt.sign({
            username : user?.username,
            userId : user?.id,
            
        },process.env.JWT_SECRET as string,{
            expiresIn : '3d'
        })

        res.status(200).json({
            success : true,
            data : {
                message : "Login successful",
                token
            }
        })
    }
    catch{
        res.status(400).json({
            message : "invalid inputs"
        })
    }
})



export default router