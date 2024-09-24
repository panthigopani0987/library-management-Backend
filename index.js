const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

//connect env and database
dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/books', bookRoutes);

//server start
const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`));