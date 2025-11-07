import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/routes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Express app
const app = express();

dotenv.config({ quiet: true });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Allowed origins (Local + Production)
const allowedOrigins = [
  'http://localhost:5173', // frontend local
  'http://localhost:5174', // admin local
  'http://localhost:5175',
  'https://travel-karnataka-jo9p.vercel.app', // frontend (user)
  'https://travel-karnataka-xt8s.vercel.app', // admin
  'https://travel-karnataka-snvwwc1ao-likhithihs-projects.vercel.app', // backend domain
  'https://travel-karnataka.vercel.app', // root
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173', // frontend local
      'http://localhost:5174', // admin local
      'http://localhost:5175',
      'https://travel-karnataka-jo9p.vercel.app', // frontend (user)
      'https://travel-karnataka-xt8s.vercel.app', // admin
      'https://travel-karnataka-snvwwc1ao-likhithihs-projects.vercel.app', // backend domain
      'https://travel-karnataka.vercel.app', // root
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api', userRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', bookingRoutes);

// Connect DB
connectDB(process.env.CONNECTDB);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
