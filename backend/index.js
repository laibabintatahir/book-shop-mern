import express, { request, response } from "express";
import mongoose from "mongoose";
import { mongoURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
// Enable CORS with specific options
app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST' , 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type']
  }));
  
const port = 5000;

app.use('/books', bookRoutes);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening at : ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
