const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectdb, disconnectdb } = require('./repository/db');

const User = require('./models/user'); // Import the User model


// Load environment variables
dotenv.config();

const auth = require('./routes/auth.routing');
const meeting = require('./routes/meeting.routing');
const events = require('./routes/events.routing');
const friends = require('./routes/friends.routing');
const user = require('./routes/user.routing');

const app = express();


app.use(cors()); // THIS IS SO UNSAFE PLEASE DO NOT LEAVE THIS HERE PERMANENTLY -Corey

connectdb()
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

app.use(express.json()); // Middleware to parse JSON

// Test Endpoint
app.get('/', (req, res) => {
  res.send('Server is running :3');
});

// Routes
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/friends', friends);
app.use('/api/meeting', meeting);
app.use('/api/user', user);

module.exports = app;

// Run server on port
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, '0.0.0.0', () => {});
}
