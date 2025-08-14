const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            phone TEXT,
            user_type TEXT CHECK(user_type IN ('customer', 'provider')) NOT NULL,
            location TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Service providers table
    db.run(`
        CREATE TABLE IF NOT EXISTS providers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            service_type TEXT NOT NULL,
            location TEXT NOT NULL,
            hourly_rate REAL,
            bio TEXT,
            is_available BOOLEAN DEFAULT 1,
            rating REAL DEFAULT 0,
            total_reviews INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Bookings table
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
            service_type TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
            scheduled_date DATETIME,
            total_amount REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Insert sample service categories/types
    const serviceTypes = [
        'Electrician',
        'Plumber', 
        'Painter',
        'Cook',
        'Tutor',
        'Driver',
        'Cleaner',
        'Gardener'
    ];

    console.log('✅ Database initialized successfully');
    console.log('📝 Available service types:', serviceTypes.join(', '));
});

db.close((err) => {
    if (err) {
        console.error('❌ Error closing database:', err.message);
    } else {
        console.log('📁 Database connection closed');
    }
});
