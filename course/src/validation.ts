import z from 'zod'


export const SignupSchema = z.object({
    email : z.email(),
    password : z.string().min(6),
    name : z.string(),
    role : z.enum(["Student", "Instructor"])
})

export const LoginSchema = z.object({
    email : z.email(),
    password :  z.string()
})


export const CreateCourseSchema = z.object({
    title : z.string(),
    description : z.string(),
    price : z.number().positive()
})


export const CreateLessonSchema = z.object({
    title : z.string(),
    content : z.string(),
    courseId : z.string()
})

export const PurchaseCourseSchema = z.object({
    courseId : z.string()
})



