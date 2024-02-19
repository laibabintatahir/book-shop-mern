import express, { request, response } from "express";
import mongoose from "mongoose";
import { mongoURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
const app = express();
app.use(express.json());
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
