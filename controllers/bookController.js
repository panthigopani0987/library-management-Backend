const Book = require('../models/Book');

//add a new book
const createBook = async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            genre,
        });
        await newBook.save();
        res.status(201).json({message:'Add a new Book',newBook});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update book
const updateBooks = async (req, res) => {
    try {
        const id = req.params.id;
        const updateBooks = await Book.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updateBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete book
const deleteBooks = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBooks = await Book.findByIdAndDelete(id);

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//borrow a book
const borrowBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book =await Book.findById(id);

        if(!book.availability) return res.status(400).json({message:'Book is already borrowed'});

        book.availability = false;
        book.borrower = req.user.id;
        await book.save();

        res.status(200).json({message:'Book borrowed successfully',book});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//return a book
const returnBook = async (req,res)=>{
    try {
        const id = req.params.id;
        const book = await Book.findById(id);

        if(book.availability) return res.status(400).json({message:'Book is already available'});

        book.availability = true;
        book.borrower = null;
        await book.save();

        res.status(200).json({message:'Book returned successfully',book});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createBook,
    getAllBooks,
    updateBooks,
    deleteBooks,
    borrowBook,
    returnBook
}