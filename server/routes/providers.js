const express = require('express');
const router = express.Router();
const db = require('../db');

// --- EXISTING ROUTE TO GET ALL PROVIDERS ---
router.get('/', (req, res) => {
    const sql = `
        SELECT p.id, p.user_id, p.service_type, p.location, p.hourly_rate, p.bio, p.is_available, u.name, u.phone
        FROM providers p
        JOIN users u ON p.user_id = u.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ error: "An internal server error occurred." });
            return;
        }
        res.json(rows);
    });
});

// --- NEW: ROUTE TO GET A SINGLE PROVIDER BY USER ID ---
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = `
        SELECT p.id, p.user_id, p.service_type, p.location, p.hourly_rate, p.bio, p.is_available, u.name, u.phone
        FROM providers p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?
    `;
    db.get(sql, [userId], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Provider not found.' });
        }
        res.json(row);
    });
});

// --- NEW: ROUTE TO UPDATE AVAILABILITY ---
router.put('/:userId/availability', (req, res) => {
    const { userId } = req.params;
    const { is_available } = req.body; // Expecting { "is_available": true } or { "is_available": false }

    if (typeof is_available !== 'boolean') {
        return res.status(400).json({ message: 'Invalid availability status provided.' });
    }

    const sql = `UPDATE providers SET is_available = ? WHERE user_id = ?`;
    db.run(sql, [is_available, userId], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Provider not found.' });
        }
        res.json({ message: 'Availability updated successfully.' });
    });
});

module.exports = router;
