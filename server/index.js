const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite and CRA default ports
    credentials: true
}));
app.use(express.json());

// Ensure DB schema is up to date (lightweight migration) — declared after dbAsync

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Utility function to promisify database operations
const dbAsync = {
    get: (query, params) => {
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    all: (query, params) => {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    run: (query, params) => {
        return new Promise((resolve, reject) => {
            db.run(query, params, function(err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    }
};

// Ensure DB schema is up to date (lightweight migration)
const ensureSchema = async () => {
    try {
        const cols = await dbAsync.all("PRAGMA table_info('users')");
        const hasLocation = cols?.some(c => c.name === 'location');
        if (!hasLocation) {
            await dbAsync.run("ALTER TABLE users ADD COLUMN location TEXT", []);
            console.log('🛠️  Migrated: added users.location column');
        }
    } catch (e) {
        console.warn('Schema check/migration skipped or failed:', e?.message || e);
    }
};

ensureSchema();

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    try {
    const { email, password, name, phone, user_type, location } = req.body;

        // Validation
        if (!email || !password || !name || !user_type) {
            return res.status(400).json({ error: 'Email, password, name, and user_type are required' });
        }

        if (!['customer', 'provider'].includes(user_type)) {
            return res.status(400).json({ error: 'user_type must be either "customer" or "provider"' });
        }

        // Check if user already exists
        const existingUser = await dbAsync.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const result = await dbAsync.run(
            'INSERT INTO users (email, password, name, phone, user_type, location) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, name, phone, user_type, location ?? null]
        );

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: result.lastID, 
                email, 
                user_type,
                name 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.lastID,
                email,
                name,
                user_type,
                phone,
                location
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await dbAsync.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                user_type: user.user_type,
                name: user.name 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                user_type: user.user_type,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const user = await dbAsync.get(
            'SELECT id, email, name, phone, user_type, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create/Update Provider Profile
app.post('/api/providers/profile', authenticateToken, async (req, res) => {
    try {
        if (req.user.user_type !== 'provider') {
            return res.status(403).json({ error: 'Only providers can create provider profiles' });
        }

        const { service_type, location, hourly_rate, bio, is_available } = req.body;

        if (!service_type || !location) {
            return res.status(400).json({ error: 'Service type and location are required' });
        }

        // Check if provider profile already exists
        const existingProvider = await dbAsync.get('SELECT id FROM providers WHERE user_id = ?', [req.user.id]);

        if (existingProvider) {
            // Update existing profile
            await dbAsync.run(
                `UPDATE providers 
                 SET service_type = ?, location = ?, hourly_rate = ?, bio = ?, is_available = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = ?`,
                [service_type, location, hourly_rate, bio, is_available !== undefined ? is_available : 1, req.user.id]
            );
            res.json({ message: 'Provider profile updated successfully' });
        } else {
            // Create new profile
            const result = await dbAsync.run(
                'INSERT INTO providers (user_id, service_type, location, hourly_rate, bio, is_available) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.id, service_type, location, hourly_rate, bio, is_available !== undefined ? is_available : 1]
            );
            res.status(201).json({ 
                message: 'Provider profile created successfully',
                provider_id: result.lastID
            });
        }

    } catch (error) {
        console.error('Provider profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Alias for frontend API compatibility
app.post('/api/provider-profile', authenticateToken, async (req, res) => {
    // Same as above endpoint
    try {
        if (req.user.user_type !== 'provider') {
            return res.status(403).json({ error: 'Only providers can create provider profiles' });
        }

        const { service_type, location, hourly_rate, bio, is_available } = req.body;

        if (!service_type || !location) {
            return res.status(400).json({ error: 'Service type and location are required' });
        }

        const existingProvider = await dbAsync.get('SELECT id FROM providers WHERE user_id = ?', [req.user.id]);

        if (existingProvider) {
            await dbAsync.run(
                `UPDATE providers 
                 SET service_type = ?, location = ?, hourly_rate = ?, bio = ?, is_available = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = ?`,
                [service_type, location, hourly_rate, bio, is_available !== undefined ? is_available : 1, req.user.id]
            );
            res.json({ message: 'Provider profile updated successfully' });
        } else {
            const result = await dbAsync.run(
                'INSERT INTO providers (user_id, service_type, location, hourly_rate, bio, is_available) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.id, service_type, location, hourly_rate, bio, is_available !== undefined ? is_available : 1]
            );
            res.status(201).json({ 
                message: 'Provider profile created successfully',
                provider_id: result.lastID
            });
        }
    } catch (error) {
        console.error('Provider profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get provider profile
app.get('/api/provider-profile', authenticateToken, async (req, res) => {
    try {
        const provider = await dbAsync.get(`
            SELECT p.*, u.name, u.email, u.phone 
            FROM providers p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.user_id = ?
        `, [req.user.id]);

        if (!provider) {
            return res.status(404).json({ error: 'Provider profile not found' });
        }

        res.json(provider);
    } catch (error) {
        console.error('Get provider profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await dbAsync.get(
            'SELECT id, email, name, phone, user_type, location FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const { name, phone, location } = req.body;
        
        await dbAsync.run(
            'UPDATE users SET name = ?, phone = ?, location = ? WHERE id = ?',
            [name, phone, location, req.user.id]
        );
        
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Alias for my-bookings
app.get('/api/my-bookings', authenticateToken, async (req, res) => {
    try {
        let query, params;

        if (req.user.user_type === 'customer') {
            query = `
                SELECT b.*, p.service_type as provider_service, p.location as provider_location,
                       u.name as provider_name, u.phone as provider_phone
                FROM bookings b
                JOIN providers p ON b.provider_id = p.id
                JOIN users u ON p.user_id = u.id
                WHERE b.customer_id = ?
                ORDER BY b.created_at DESC
            `;
            params = [req.user.id];
        } else if (req.user.user_type === 'provider') {
            query = `
                SELECT b.*, u.name as customer_name, u.phone as customer_phone, u.location as customer_location
                FROM bookings b
                JOIN users u ON b.customer_id = u.id
                WHERE b.provider_id = (SELECT id FROM providers WHERE user_id = ?)
                ORDER BY b.created_at DESC
            `;
            params = [req.user.id];
        } else {
            return res.status(403).json({ error: 'Invalid user type' });
        }

        const bookings = await dbAsync.all(query, params);
        res.json(bookings);

    } catch (error) {
        console.error('Get my bookings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all providers (with optional filtering)
app.get('/api/providers', async (req, res) => {
    try {
        const { service_type, location } = req.query;
        
        let query = `
            SELECT p.*, u.name, u.phone, u.email
            FROM providers p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.is_available = 1
        `;
        let params = [];

        if (service_type) {
            query += ' AND p.service_type = ?';
            params.push(service_type);
        }

        if (location) {
            query += ' AND p.location LIKE ?';
            params.push(`%${location}%`);
        }

        query += ' ORDER BY p.created_at DESC';

        const providers = await dbAsync.all(query, params);
        res.json({ providers });

    } catch (error) {
        console.error('Get providers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single provider by ID
app.get('/api/providers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const provider = await dbAsync.get(`
            SELECT p.*, u.name, u.phone, u.email, u.created_at as user_created_at
            FROM providers p 
            JOIN users u ON p.user_id = u.id 
            WHERE p.id = ?
        `, [id]);

        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        res.json({ provider });

    } catch (error) {
        console.error('Get provider error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
    try {
        if (req.user.user_type !== 'customer') {
            return res.status(403).json({ error: 'Only customers can create bookings' });
        }

        const { provider_id, service_type, description, scheduled_date } = req.body;

        if (!provider_id || !service_type) {
            return res.status(400).json({ error: 'Provider ID and service type are required' });
        }

        // Verify provider exists and is available
        const provider = await dbAsync.get('SELECT * FROM providers WHERE id = ? AND is_available = 1', [provider_id]);
        if (!provider) {
            return res.status(404).json({ error: 'Provider not found or unavailable' });
        }

        // Create booking
        const result = await dbAsync.run(
            'INSERT INTO bookings (customer_id, provider_id, service_type, description, scheduled_date) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, provider_id, service_type, description, scheduled_date]
        );

        res.status(201).json({
            message: 'Booking created successfully',
            booking_id: result.lastID
        });

    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
    try {
        let query, params;

        if (req.user.user_type === 'customer') {
            query = `
                SELECT b.*, p.service_type as provider_service, u.name as provider_name, u.phone as provider_phone
                FROM bookings b
                JOIN providers p ON b.provider_id = p.id
                JOIN users u ON p.user_id = u.id
                WHERE b.customer_id = ?
                ORDER BY b.created_at DESC
            `;
            params = [req.user.id];
        } else if (req.user.user_type === 'provider') {
            query = `
                SELECT b.*, u.name as customer_name, u.phone as customer_phone
                FROM bookings b
                JOIN users u ON b.customer_id = u.id
                WHERE b.provider_id = (SELECT id FROM providers WHERE user_id = ?)
                ORDER BY b.created_at DESC
            `;
            params = [req.user.id];
        } else {
            return res.status(403).json({ error: 'Invalid user type' });
        }

        const bookings = await dbAsync.all(query, params);
        res.json({ bookings });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update booking status (for providers)
app.patch('/api/bookings/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'accepted', 'in_progress', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Verify booking exists and user has permission to update
        let booking;
        if (req.user.user_type === 'provider') {
            booking = await dbAsync.get(`
                SELECT b.* FROM bookings b
                JOIN providers p ON b.provider_id = p.id
                WHERE b.id = ? AND p.user_id = ?
            `, [id, req.user.id]);
        } else if (req.user.user_type === 'customer') {
            booking = await dbAsync.get('SELECT * FROM bookings WHERE id = ? AND customer_id = ?', [id, req.user.id]);
        }

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found or access denied' });
        }

        // Update booking status
        await dbAsync.run(
            'UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Booking status updated successfully' });

    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get service types (for frontend dropdowns)
app.get('/api/services/types', (req, res) => {
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
    res.json({ service_types: serviceTypes });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('📁 Database connection closed');
        }
        process.exit(0);
    });
});
