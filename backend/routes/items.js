// backend/routes/items.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });
// Add a new item
router.post('/', (req, res) => {
    const { user_id, category_id, title, description, start_date, end_date, starting_bid } = req.body;

    db.query('INSERT INTO items (user_id, category_id, title, description, start_date, end_date, starting_bid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
[user_id, category_id, title, description, start_date, end_date, starting_bid], (err, results) => {
    if (err) {
        console.error('Error adding item:', err); // Log the error for debugging
        return res.status(500).send('Error adding item.');
    }
    res.status(201).send({ id: results.insertId, title });
});

});

// Get all items
router.get('/', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching items.');
        }
        res.status(200).send(results);
    });
});
// backend/routes/items.js
router.get('/', (req, res) => {
    db.query(`
        SELECT items.*, 
            (SELECT MAX(bid_amount) FROM bids WHERE item_id = items.id) AS highest_bid,
            (SELECT COUNT(*) FROM bids WHERE item_id = items.id) AS bids_count,
            (SELECT username FROM users WHERE id = (SELECT user_id FROM bids WHERE item_id = items.id ORDER BY bid_amount DESC LIMIT 1)) AS highest_bidder
        FROM items
    `, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching items.');
        }
        res.status(200).send(results);
    });
});

module.exports = router;
