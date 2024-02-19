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
      response.status(400).send({
        message:
          "Please provide all required fields: author, title, publishedYear",
      });
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
    const books = await Book.find();
    response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a single book by ID
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }
    response.status(200).json(book);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to update a book by ID
app.put("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, publishedYear } = request.body;

    if (!title || !author || !publishedYear) {
      return response.status(400).json({
        error:
          "Please provide all required fields: title, author, publishedYear",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishedYear },
      { new: true }
    );

    // Check if the book exists
    if (!updatedBook) {
      return response.status(404).json({ error: "Book not found" });
    }
    response.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a book by ID
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return response.status(404).json({ error: "Book not found" });
    }
    response.status(200).json({ message: "Book deleted successfully" });
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
