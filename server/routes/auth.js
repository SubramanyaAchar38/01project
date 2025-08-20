// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../db'); // Import our central database connection

// // --- REGISTRATION ROUTE ---
// // @route   POST /api/auth/register
// router.post('/register', async (req, res) => {
//   const { name, email, password, user_type } = req.body;

//   try {
//     // 1. Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 2. SQL query to insert a new user
//     const sql = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
    
//     // 'this' inside the callback refers to the statement object
//     db.run(sql, [name, email, hashedPassword, user_type], function(err) {
//       if (err) {
//         // Check for unique email constraint error
//         if (err.message.includes('UNIQUE constraint failed')) {
//           return res.status(400).json({ msg: 'User with this email already exists' });
//         }
//         return res.status(500).json({ msg: 'Server error during registration' });
//       }

//       // 3. Create JWT payload with the new user's ID and name
//       const payload = {
//         user: {
//           id: this.lastID, // this.lastID gives the ID of the row just inserted
//           name: name,
//         },
//       };

//       // 4. Sign and return the token
//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: '5h' },
//         (err, token) => {
//           if (err) throw err;
//           res.status(201).json({ token });
//         }
//       );
//     });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // --- LOGIN ROUTE ---
// // @route   POST /api/auth/login
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     const sql = `SELECT * FROM users WHERE email = ?`;

//     db.get(sql, [email], async (err, user) => {
//         if (err) return res.status(500).json({ msg: 'Server error during login' });
//         if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//         // User found, now compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//         // Passwords match, create JWT
//         const payload = {
//             user: {
//                 id: user.id,
//                 name: user.name,
//             },
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: '5h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     });
// });


// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Ensure this path is correct
const router = express.Router();

// --- YOUR EXISTING LOGIN ROUTE ---
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error.' });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                user_type: user.user_type
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_default_jwt_secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    });
});

// --- NEW/UPDATED ROUTE FOR PROVIDER REGISTRATION ---
router.post('/register-provider', (req, res) => {
    const { name, email, password, phone, location, service_type, hourly_rate, bio } = req.body;

    // Basic validation
    if (!name || !email || !password || !service_type) {
        return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Step 1: Insert into the 'users' table
    const userSql = `INSERT INTO users (name, email, password, phone, user_type, location) VALUES (?, ?, ?, ?, 'provider', ?)`;
    db.run(userSql, [name, email, hashedPassword, phone, location], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'An account with this email already exists.' });
            }
            return res.status(500).json({ message: 'Database error while creating user.' });
        }

        const userId = this.lastID; // Get the ID of the user we just created

        // Step 2: Insert into the 'providers' table
        const providerSql = `INSERT INTO providers (user_id, service_type, location, hourly_rate, bio, is_available) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(providerSql, [userId, service_type, location, hourly_rate, bio, true], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error while creating provider profile.' });
            }

            // If everything is successful, send a success response
            res.status(201).json({ message: 'Provider registered successfully!' });
        });
    });
});

// --- YOUR OTHER AUTH ROUTES (e.g., customer registration) CAN GO HERE ---

module.exports = router;


