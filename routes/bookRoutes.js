const express = require('express');
const {createBook,getAllBooks,updateBooks,deleteBooks,borrowBook,returnBook} = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router();

routes.post('/',authMiddleware,createBook);
routes.get('/',getAllBooks);
routes.put('/:id',authMiddleware,updateBooks);
routes.delete('/:id',authMiddleware,deleteBooks);
routes.post('/:id/borrow',authMiddleware,borrowBook);
routes.post('/:id/return',authMiddleware,returnBook);

module.exports = routes;