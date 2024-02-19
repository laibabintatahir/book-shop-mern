import express, { request, response } from "express";
import mongoose from "mongoose";
import { mongoURL } from "./config.js";
import { Book } from "./models/bookModels.js";
const app = express();
app.use(express.json());
const port = 5000;

// Route to handle creation of a new book
app.post("/books", async (request, response) => {
    try {
      if (
        !request.body.author ||
        !request.body.title ||
        !request.body.publishedYear
      ) {
        response.status(400).send({ message: "Please provide all required fields: author, title, publishedYear" });
        return;
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishedYear: request.body.publishedYear,
      };
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.error("Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Route to get all books
app.get("/books", async (request, response) => {
    try {
      // Fetch all books from the database
      const books = await Book.find();
      response.status(200).json({
        count : books.length,
        data: books

      });
    } catch (error) {
      console.error("Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });
  

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
