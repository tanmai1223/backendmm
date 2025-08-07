import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import cors from "cors"

const app=express()
dotenv.config();
mongodb();

const allowedOrigins = [
  'https://mymemoriesp.netlify.app',
  'https://mymemories-qrkc.onrender.com', // <-- add this too
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies or sessions
}));
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/memories',memoryRoutes)
app.use('/api/admin',adminRoutes)



app.listen(3000,()=>{
    console.log(`Your app is running on http://localhost:3000`)
})
