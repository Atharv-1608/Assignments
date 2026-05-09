import express from 'express'
import authRoutes from './routes/auth'
import courseRoutes from './routes/course' 

const app = express()


app.use(express.json())

app.use('/auth',authRoutes)
app.use('/courses',courseRoutes)



app.listen(3001)
