import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";

const router = Router()

router.post('/',authMiddleware,async(req,res)=>{
    
})


export default router