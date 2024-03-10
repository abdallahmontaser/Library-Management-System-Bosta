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
                            • `400 Bad Request`: Returned if the provided title already exists for another book, or if the request is malformed.
                            • `404 Not Found`: Returned if the book with the specified ID does not exist.


    • DELETE /Api/Books/Book/DeleteBook/{id}
        Description: Deletes a book identified by its ID.
        Path Parameters: 
                            • `id` (integer, required): The ID of the book to be deleted.
        Status Codes:
                            • `200 OK`: Returned when the book is added successfully.
                            • `404 Not Found`: Returned if the book with the specified ID does not exist.


2. Borrowers
    • GET /Api/Borrowers
        Description: Retrieves an array of borrowers.
        Path Parameters: 
                            • `id` (integer, required): The ID of the borrower.
        Status Codes:
                            • `200 OK`: Returned when the request is successful.


    • GET /Api/Borrowers/Borrower/{id}/CurrentBooks
        Description: Retrieves all books currently borrowed by a specific borrower and not yet returned.
        Status Codes:
                            • `200 OK`: Returned when the request is successful.


    • POST /Api/Borrowers/Borrower/RegisterBorrower
        Content-Type: application/json
        Description: Registers a new borrower.
        Request Body:
                            • `name` (string, required): TName of the borrower.
                            • `email` (string, required): Email address of the borrower.
        Status Codes:
                            • `200 OK`: Returned when the borrower is added successfully.
                            • `400 Bad Request`: Returned if the provided email already exists for another borrower.

    
    • PUT /Api/Borrowers/Borrower/UpdateBorrower/{id}
        Content-Type: application/json
        Description: Updates an existing borroweridentified by its ID.
        Path Parameters: 
                            • `id` (integer, required): The ID of the borrower to be updated.
        Request Body (at least one field is required):
                            •`name` (string): Updated name of the borrower.
                            •`email` (string): Updated email address of the borrower.
        Status Codes:
                            • `200 OK`: Returned when the borrower is updated successfully.
                            • `400 Bad Request`: Returned if the provided email already exists for another borrower, or if the request is malformed.
                            • `404 Not Found`: Returned if the borrower with the specified ID does not exist.


    • DELETE /Api/Borrowers/Borrower/DeleteBorrower/{id}
        Description: Deletes a borrower identified by its ID.
        Path Parameters: 
                            • `id` (integer, required): The ID of the borrower to be deleted.
        Status Codes:
                            • `200 OK`: Returned when the borrower is deleted successfully.
                            • `404 Not Found`: Returned if the borrower with the specified ID does not exist.


3. Borrowing
    • POST /Api/Borrowing/CheckoutBook
        Description: Checks out a book to a borrower.
        Request Body:
                            • `bookId` (integer, required): ID of the book to be checked out.
                            • `borrowerId` (integer, required): ID of the borrower who is checking out the book.
                            • `dueDate` (string, required): Due date for returning the book, formatted as "YYYY-MM-DD".
        Status Codes:
                            • `200 OK`: Returned when the book is checked out successfully.
                            • `400 Bad Request`:  Returned if the book is not available for checkout (quantity is 0) or if the due date is in the past.
                            • `404 Not Found`: Returned if the book ID or borrower ID does not exist.


    • POST /Api/Borrowing/ReturnBook
        Content-Type: application/json
        Description: Returns a book that was previously checked out.
        Request Body:
                            • `borrowingId` (integer, required): ID of the borrowing to be returned.
        Status Codes:
                            • `200 OK`: Returned when the book is returned successfully.
                            • `400 Bad Request`:  Returned if the book has already been returned.
                            • `404 Not Found`: Returned if the borrowing ID does not exist.

    
    • GET /Api/Borrowing/BorrowedBooks
        Content-Type: application/json
        Description: Returns a CSV file containing information about borrowed books within a specified date range.
        Request Body (can ignore it and get from last month to now):
                            •`startDate` (string, required): Start date of the range in "YYYY-MM-DD" format.
                            •`endDate` (string, required): End date of the range in "YYYY-MM-DD" format.
        Status Codes:
                            • `200 OK`: Returned when the CSV file is generated successfully.
                            • `400 Bad Request`: Returned if either startDate or endDate is missing, or if startDate is after endDate.


    • GET /Api/Borrowing/OverdueBooks
        Content-Type: application/json
        Description: Returns a CSV file containing information about overdue borrowed books within a specified date range.
        Request Body (can ignore it and get from last month to now):
                            •`startDate` (string, required): Start date of the range in "YYYY-MM-DD" format.
                            •`endDate` (string, required): End date of the range in "YYYY-MM-DD" format.
        Status Codes:
                            • `200 OK`: Returned when the CSV file is generated successfully.
                            • `400 Bad Request`: Returned if either startDate or endDate is missing, or if startDate is after endDate.

