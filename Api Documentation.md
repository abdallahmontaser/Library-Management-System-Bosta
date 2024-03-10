                                                    API Endpoints


1. Books
    • GET /Api/Books
        Description: Retrieves an array of books.
        Query Parameters:
                            • `title` (optional): Filter books by title.
                            • `author` (optional): Filter books by author.
                            • `ISBN` (optional): Filter books by ISBN.
        Status Codes:
                            • `200 OK`: Returned when the request is successful.


    • POST /Api/Books/Book/AddBook
        Content-Type: application/json
        Description: Adds a new book.
        Request Body:
                            • `title` (string, required): Title of the book.
                            • `author` (string, required): Author of the book.
                            • `ISBN` (string, required): ISBN of the book.
                            • `quantity` (integer, required): Available quantity of the book.
                            • `shelf` (string, required): Shelf where the book is located
        Status Codes:
                            • `200 OK`: Returned when the book is added successfully.
                            • `400 Bad Request`: Returned if the provided book title already exists.

    
    • PUT /Api/Books/Book/UpdateBook/{id}
        Content-Type: application/json
        Description: Updates an existing book identified by its ID.
        Path Parameters: 
                            • `id` (integer, required): The ID of the book to be updated.
        Request Body (at least one field is required):
                            •`title` (string): Updated title of the book.
                            •`author` (string): Updated author of the book.
                            •`ISBN` (string): Updated ISBN of the book.
                            •`quantity` (integer): Updated available quantity of the book.
                            •`shelf` (string): Updated shelf where the book is located.
        Status Codes:
                            • `200 OK`: Returned when the book is added successfully.
                            • `400 Bad Request`: Returned if the provided book title already exists.
                            • `404 Not Found`: Returned if the book with the specified ID does not exist.
