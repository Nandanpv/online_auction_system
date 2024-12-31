// // backend/routes/transactions.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db'); // Import the database connection

// // Create a new transaction
// router.post('/', (req, res) => {
//     const { bid_id, amount } = req.body;

//     db.query('INSERT INTO transactions (bid_id, transaction_date, amount) VALUES (?, NOW(), ?)', 
//     [bid_id, amount], (err, results) => {
//         if (err) {
//             return res.status(500).send('Error creating transaction.');
//         }
//         res.status(201).send({ id: results.insertId, bid_id, amount });
//     });
// });

// // Get all transactions
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM transactions', (err, results) => {
//         if (err) {
//             return res.status(500).send('Error fetching transactions.');
//         }
//         res.status(200).send(results);
//     });
// });

// module.exports = router;
// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Save a new transaction
router.post('/', (req, res) => {
    const { bid_id, transaction_date, amount } = req.body;

    db.query('INSERT INTO transactions (bid_id, transaction_date, amount) VALUES (?, ?, ?)', 
    [bid_id, transaction_date, amount], (err, results) => {
        if (err) {
            return res.status(500).send('Error saving transaction.');
        }
        res.status(201).send({ id: results.insertId, bid_id, amount });
    });
});

module.exports = router;
