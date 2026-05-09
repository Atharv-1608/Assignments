import express, { Router } from 'express'
import { LoginSchema, SignupSchema } from '../validation'
import { prisma } from '../db/db'
import { Role } from '../../generated/prisma/enums'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const router = Router()

router.post('/signup',async (req,res)=>{
    const body = req.body

    const parsedbody = SignupSchema.safeParse(body)

    if(!parsedbody.success){
        return res.status(400).json({
            message : "invalid inputs"
        })
    }

    const { email, password, name, role } = parsedbody.data

    if(!Object.values(Role).includes(role)){
        return res.status(400).json({
        message: "Invalid role"
  })
    }

    const hashedPassword = await bcrypt.hash(password,7)

    const user = await prisma.user.create({
        data : {
            email,
            password : hashedPassword,
            name,
            role : role as Role
        }
    })

    if(!user){
        return res.status(401).json({
            message : "Failed"
        })
    }
    
    return res.status(200).json({
        message : "User created successfully"
    })

})


router.post("/login", async (req, res) => {
    
  const parsedbody = LoginSchema.safeParse(req.body)

  if (!parsedbody.success) {
    return res.status(400).json({
      message: "Invalid inputs"
    })
  }

  const { email, password } = parsedbody.data

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    process.env.JWT_SECRET as string,
  )

  return res.status(200).json({ token })
})

export default router