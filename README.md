# E-Library Management Backend

## Description
This is the backend API for the E-Library Management Application, handling user authentication, book management, and borrowing/returning operations.

## Features
- User Authentication (JWT-based)
- CRUD Operations for Books (Create, Read, Update, Delete)
- Borrow and Return eBooks

## Usage
Use Postman or any HTTP client to test the API endpoints.

## Folder Structure
- **controllers/**: Contains the logic for handling API requests
- **models/**: Contains the Mongoose schemas for Users and Books
- **routes/**: Defines API routes for authentication and books
- **middlewares/**: Authentication and error handling middlewares
- **uploads/**: Stores uploaded book images
