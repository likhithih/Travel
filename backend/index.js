import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';


dotenv.config({ quiet: true });

const app = express();




connectDB(process.env.CONNECTDB);



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
