import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT;

// CONECTING TO MONGO DATABSE 
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error(err));

// STARTS THE SERVER
app.listen(PORT,()=>{
    console.log(`ServerS running on http://localhost:${PORT}/`)
})