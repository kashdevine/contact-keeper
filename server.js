const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req,res)=> res.json({msg:'Welcome to the contact keeper api...'}));


// Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Setup Port

const PORT = process.env.PORT || 5000;

// Start Listening to the port
app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`));