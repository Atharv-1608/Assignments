import express from 'express'
import { prisma } from './db/db';
import authRoutes from './routes/auth'
import bookingRoutes from './routes/booking'
import { authMiddleware } from './middleware';

const app = express();
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/bookings",bookingRoutes);

app.listen(3000);