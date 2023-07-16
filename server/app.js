import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './dbconn/conn.js';
import MeetRouter from './routes/meet_routes.js';
import userRouter from './routes/user_routes.js';

const app = express();
dotenv.config({ path: './config.env' });

//db
connectDB();

//middlewares
app.use(cookieParser());
app.use(cors({
    origin: 'https://meet-slot-booking-frontend.vercel.app/login',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/meets', MeetRouter);

app.get('/', (req, res) => {
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server up and running  at ${PORT}`);
});
