import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/routes.js';


// Initialize Express app
const app = express();
dotenv.config({ quiet: true });


// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', userRoutes);


// Connect to the database
connectDB(process.env.CONNECTDB);


// Start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
