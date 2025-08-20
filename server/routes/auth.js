const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Import our central database connection

// --- REGISTRATION ROUTE ---
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, user_type } = req.body;

  try {
    // 1. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. SQL query to insert a new user
    const sql = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
    
    // 'this' inside the callback refers to the statement object
    db.run(sql, [name, email, hashedPassword, user_type], function(err) {
      if (err) {
        // Check for unique email constraint error
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ msg: 'User with this email already exists' });
        }
        return res.status(500).json({ msg: 'Server error during registration' });
      }

      // 3. Create JWT payload with the new user's ID and name
      const payload = {
        user: {
          id: this.lastID, // this.lastID gives the ID of the row just inserted
          name: name,
        },
      };

      // 4. Sign and return the token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// --- LOGIN ROUTE ---
// @route   POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], async (err, user) => {
        if (err) return res.status(500).json({ msg: 'Server error during login' });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // User found, now compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Passwords match, create JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    });
});


module.exports = router;