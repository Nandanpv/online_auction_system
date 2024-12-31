// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Get all users
router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching users.');
        }
        res.status(200).send(results);
    });
});

// Get all items
router.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching items.');
        }
        res.status(200).send(results);
    });
});

// Get all bids
router.get('/bids', (req, res) => {
    db.query('SELECT * FROM bids', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching bids.');
        }
        res.status(200).send(results);
    });
});

// Get all transactions
router.get('/transactions', (req, res) => {
    db.query('SELECT * FROM transactions', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching transactions.');
        }
        res.status(200).send(results);
    });
});

module.exports = router;
