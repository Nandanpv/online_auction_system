// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/auth'); // Import the authentication routes
const itemRoutes = require('./routes/items'); 
const bidRoutes = require('./routes/bids');
const transactionRoutes = require('./routes/transactions');
const adminRoutes = require('./routes/admin');
const dashboardRoutes = require('./routes/dashboard'); 
const categoryRoutes = require('./routes/categories');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

 // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // Replace with your MySQL username
//     password: 'nandanpv-00', // Replace with your MySQL password
//     database: 'Online_auction' // Replace with your database name
// });

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/bids', bidRoutes); 
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes); 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
