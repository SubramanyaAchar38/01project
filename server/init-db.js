// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// const dbPath = path.join(__dirname, 'database.db');
// const db = new sqlite3.Database(dbPath);

// // Create tables
// db.serialize(() => {
//     // Users table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             email TEXT UNIQUE NOT NULL,
//             password TEXT NOT NULL,
//             name TEXT NOT NULL,
//             phone TEXT,
//             user_type TEXT CHECK(user_type IN ('customer', 'provider')) NOT NULL,
//             location TEXT,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//     `);

//     // Service providers table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS providers (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//             service_type TEXT NOT NULL,
//             location TEXT NOT NULL,
//             hourly_rate REAL,
//             bio TEXT,
//             is_available BOOLEAN DEFAULT 1,
//             rating REAL DEFAULT 0,
//             total_reviews INTEGER DEFAULT 0,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//     `);

//     // Bookings table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS bookings (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//             provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
//             service_type TEXT NOT NULL,
//             description TEXT,
//             status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
//             scheduled_date DATETIME,
//             total_amount REAL,
//             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//             updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )
//     `);

//     // Insert sample service categories/types
//     const serviceTypes = [
//         'Electrician',
//         'Plumber', 
//         'Painter',
//         'Cook',
//         'Tutor',
//         'Driver',
//         'Cleaner',
//         'Gardener'
//     ];

//     console.log('✅ Database initialized successfully');
//     console.log('📝 Available service types:', serviceTypes.join(', '));
// });

// db.close((err) => {
//     if (err) {
//         console.error('❌ Error closing database:', err.message);
//     } else {
//         console.log('📁 Database connection closed');
//     }
// });





const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs'); // We'll use bcrypt to hash passwords

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log('Starting database initialization...');

    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            phone TEXT,
            user_type TEXT CHECK(user_type IN ('customer', 'provider')) NOT NULL,
            location TEXT
        )
    `);

    // Service providers table
    db.run(`
        CREATE TABLE IF NOT EXISTS providers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            service_type TEXT NOT NULL,
            location TEXT NOT NULL,
            hourly_rate REAL,
            bio TEXT,
            is_available BOOLEAN DEFAULT 1
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER REFERENCES users(id),
            provider_id INTEGER REFERENCES providers(id),
            status TEXT DEFAULT 'pending'
        )
    `);

    console.log('✅ Tables created successfully (if they did not exist).');

    // --- Insert Sample Data Sequentially ---
    const providersToInsert = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '9876543210', service_type: 'Electrician', location: 'Mumbai, MH', hourly_rate: 500, bio: 'Certified electrician with 10 years of experience.', is_available: true },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '8765432109', service_type: 'Plumber', location: 'Delhi, DL', hourly_rate: 450, bio: 'Expert in fixing leaks and installing pipes.', is_available: false },
        { name: 'Amit Patel', email: 'amit.patel@example.com', phone: '7654321098', service_type: 'Painter', location: 'Bangalore, KA', hourly_rate: 400, bio: 'Professional painting for homes and offices.', is_available: true },
        { name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '6543210987', service_type: 'Cook', location: 'Mumbai, MH', hourly_rate: 600, bio: 'Specializing in North Indian and Continental cuisine.', is_available: true }
    ];

    const userSql = `INSERT OR IGNORE INTO users (name, email, password, phone, user_type, location) VALUES (?, ?, ?, ?, 'provider', ?)`;
    const providerSql = `INSERT OR IGNORE INTO providers (user_id, service_type, location, hourly_rate, bio, is_available) VALUES (?, ?, ?, ?, ?, ?)`;
    const selectUserSql = `SELECT id FROM users WHERE email = ?`;
    
    const samplePassword = bcrypt.hashSync('password123', 10);

    // This function inserts providers one by one to avoid race conditions
    function insertNextProvider(index) {
        if (index >= providersToInsert.length) {
            console.log('✅ All sample data has been processed.');
            // All done, now we can safely close the database
            db.close((err) => {
                if (err) {
                    return console.error('❌ Error closing database:', err.message);
                }
                console.log('📁 Database connection closed. Initialization complete.');
            });
            return;
        }

        const p = providersToInsert[index];
        
        db.run(userSql, [p.name, p.email, samplePassword, p.phone, p.location], function(err) {
            if (err) {
                console.error(`Error inserting user ${p.email}:`, err.message);
                insertNextProvider(index + 1); // Move to the next one even if this fails
                return;
            }

            // After inserting the user, we need their ID to create the provider entry.
            db.get(selectUserSql, [p.email], (err, row) => {
                if (err || !row) {
                    console.error(`Could not find user ID for ${p.email}.`);
                    insertNextProvider(index + 1); // Move on
                    return;
                }
                
                const userId = row.id;
                db.run(providerSql, [userId, p.service_type, p.location, p.hourly_rate, p.bio, p.is_available], (err) => {
                    if (err) {
                        console.error(`Error inserting provider details for ${p.email}:`, err.message);
                    }
                    // Once this provider is done, recursively call for the next one
                    insertNextProvider(index + 1);
                });
            });
        });
    }

    // Start the insertion chain from the first provider
    console.log('📝 Starting to insert sample provider data...');
    insertNextProvider(0);
});