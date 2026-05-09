import { Router, type Request, type Response } from "express";
import { authMiddleware} from "../middleware.js";
import { prisma } from "../db/db.js";
import { status } from "../../generated/prisma/enums.js";


const router = Router();

router.post('/', authMiddleware ,async(req :  Request,res : Response)=>{

    try{
        const { car_name , days , rent_per_day } = req.body;
        console.log(req.user?.userId)
        console.log(req.body)

    if (days > 365 || rent_per_day > 2000 || car_name == "" || rent_per_day <= 0 || !car_name || !days || !rent_per_day) {
            return res.status(400).json({
                message: 'invaild inputs'
            });
        }

        const totalCost = rent_per_day * days;

    const booking = await prisma.booking.create({
            data:{
                car_name:car_name,
                days:days,
                rent_per_day:rent_per_day,
                user_id:(req as any).user.userId
            }
        })

        return res.status(200).json({
            success : true,
            data : {
                message : "Booking created successfully",
                bookingId : booking.id,
                totalCost : totalCost,
            }
        })
    }
    catch(e){
        res.json({
            e
        })
    }
    
})


router.get('/',authMiddleware,async(req,res)=>{

   try{
     const {bookingId , summary} = req.query;

    if(bookingId && summary){
        return res.status(401).json({
            message : "invalid inputs"
        })
    }


    if(bookingId){

        const booking = await prisma.booking.findFirst({
            where : {
                user_id : req.user?.userId,
                id : Number(bookingId)
            }
        })



        if(!booking){
            return res.status(404).json({
                message : "bookingId not found"
            })
        }
        

        return res.status(200).json({
            success : true,
            data : {
                id : booking?.id,
                car_name : booking?.car_name,
                days : booking?.days,
                rent_per_day : booking?.rent_per_day,
                status : booking?.status,
                totalCost : booking?.rent_per_day * booking?.days 


            }
        })

    }

    if(summary){

        const booking = await prisma.booking.findMany({
            where : {
                user_id : req.user?.userId,
                status : {
                    in : ['booked','completed']
                }
            },
            select  : {
                days : true,
                rent_per_day :  true
            }
        })

        if(!booking){
            return res.status(404).json({
                message : "bookingId not found"
            })
        }

        const totalAmount = booking.reduce((sum,booking)=>{
            return sum + (booking.days * booking.rent_per_day)
        },0)


        return res.status(200).json({
            success : true ,
            data : {
                userId  : req.user?.userId,
                username : req.user?.username,
                totalBookings : booking.length,
                totalAmountSpent : totalAmount

            }
        })

    }
   }
   catch(e){

   }

})


router.put('/:bookingId',authMiddleware,async(req,res)=>{

    try{
        
        const bookingId = req.params.bookingId;
        const {car_name,days,rent_per_day,status} = req.body

        
        if(!req.body || Object.keys(req.body).length == 0){
            return res.status(400).json({
                success : false ,
                message : "invalid inputs"
            })
        }

        const booking = await prisma.booking.findFirst({
            where : {
                id : Number(bookingId)
            }
        })

        if(!booking){
            return res.status(404).json({
                success : false ,
                message : "booking not found"
            })
        }

        const user = await prisma.booking.findFirst({
        where:{
            user_id:(req as any).user.userId
        }
    })

    if(!user){
        return res.status(403).json({
            success:false,
            data:{
                message:'booking does not belong to user'
            }
        })
    }

        

        const newTotalCost = days * rent_per_day;

        const updateBooking = await prisma.booking.update({
            where : {
                id : Number(bookingId)
            },
            data : {
                car_name ,
                days,
                rent_per_day
            }
        })

        return res.status(200).json({
            success : true ,
            message : "booking updates successfully",
            booking : {
                id : bookingId,
                car_name,
                days,
                rent_per_day,
                newTotalCost,
                status
            }
        })
            
        

    }
    catch(e){

        return res.status(400).json({
            success : false ,
            message : "invalid inputs"
        })

    }






})

export default router