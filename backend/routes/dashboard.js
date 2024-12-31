// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Get all auction items for the dashboard
router.get('/', (req, res) => {
    db.query('SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching items.');
        }
        res.status(200).send(results);
    });
});

module.exports = router;
