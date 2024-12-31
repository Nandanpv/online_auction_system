// backend/routes/bids.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Place a new bid
router.post('/', (req, res) => {
    const { item_id, user_id, bid_amount } = req.body;

    db.query('INSERT INTO bids (item_id, user_id, bid_amount, bid_date) VALUES (?, ?, ?, NOW())', 
    [item_id, user_id, bid_amount], (err, results) => {
        if (err) {
            return res.status(500).send('Error placing bid.');
        }
        res.status(201).send({ id: results.insertId, item_id, user_id, bid_amount });
    });
});

// Get all bids for a specific item
router.get('/:item_id', (req, res) => {
    const { item_id } = req.params;

    db.query('SELECT * FROM bids WHERE item_id = ?', [item_id], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching bids.');
        }
        res.status(200).send(results);
    });
});

module.exports = router;
