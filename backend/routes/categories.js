// backend/routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Add a new category
router.post('/', (req, res) => {
    const { name } = req.body;

    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            return res.status(500).send('Error adding category.');
        }
        res.status(201).send({ id: results.insertId, name });
    });
});

// Get all categories
router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching categories.');
        }
        res.status(200).send(results);
    });
});

module.exports = router;
