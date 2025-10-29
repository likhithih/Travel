// 1️⃣ Load environment variables first
import dotenv from 'dotenv';
dotenv.config(); // load .env variables

// 2️⃣ Other imports
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/routes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import { sendBookingCancelledEmail, sendBookingConfirmationEmail, sendBookingPendingEmail } from './utils/mailer.js';

// 3️⃣ Initialize Express app
const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', userRoutes);
app.use('/', dashboardRoutes);
app.use('/', bookingRoutes);

// Connect to the database
connectDB(process.env.CONNECTDB);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
