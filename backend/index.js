import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import promoRoutes from './routes/promoRoutes.js';

dotenv.config();

// app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

app.get("/", (req, res)=>{
  res.send("API Working")
})

// API routes
app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

app.listen(port, ()=>{
  console.log(`Server Started on http://localhost:${port}`);
})
