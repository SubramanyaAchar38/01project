# All In One Backend

A simple Node.js/Express backend for the All In One marketplace.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize the database:**
   ```bash
   npm run init-db
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Providers
- `POST /api/providers/profile` - Create/update provider profile
- `GET /api/providers` - Get all providers (with optional filters)
- `GET /api/providers/:id` - Get single provider

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `PATCH /api/bookings/:id/status` - Update booking status

### Services
- `GET /api/services/types` - Get available service types

### Health
- `GET /api/health` - Server health check

## Database

Uses SQLite for simplicity. The database file (`database.db`) will be created automatically when you run `npm run init-db`.

## Environment Variables

Copy `.env` file and update:
- `JWT_SECRET` - Secret key for JWT tokens (change in production!)
- `PORT` - Server port (default: 3001)

## User Types

- **customer** - Can browse providers and create bookings
- **provider** - Can create service profiles and manage bookings

## Service Types

Available service categories:
- Electrician
- Plumber
- Painter
- Cook
- Tutor
- Driver
- Cleaner
- Gardener
