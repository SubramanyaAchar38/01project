// const express = require('express');
// const cors = require('cors');
// require('dotenv').config(); // Loads environment variables from .env file

// const app = express();
// const PORT = process.env.PORT || 5000;

// // --- Middleware ---
// app.use(cors());
// app.use(express.json());

// // --- API Routes ---
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Use the auth routes we created for SQLite
// app.use('/api/auth', require('./routes/auth'));

// // --- Start Server ---
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the auth routes
app.use('/api/auth', require('./routes/auth'));

// --- ADD THIS LINE ---
// Use the provider routes to handle requests for service providers
app.use('/api/providers', require('./routes/providers'));


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});