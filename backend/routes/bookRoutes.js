// Route to update a book by ID
app.put("/books/:id", async (request, response) => {
    try {
      // Extract book ID from the request parameters
      const { id } = request.params;
  
      // Extract updated book data from the request body
      const { title, author, publishedYear } = request.body;
  
      // Check if any required fields are missing
      if (!title || !author || !publishedYear) {
        return response.status(400).json({ error: "Please provide all required fields: title, author, publishedYear" });
      }
  
      // Find the book by ID and update its data
      const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishedYear }, { new: true });
  
      // Check if the book exists
      if (!updatedBook) {
        return response.status(404).json({ error: "Book not found" });
      }
  
      // Respond with the updated book
      response.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });
  