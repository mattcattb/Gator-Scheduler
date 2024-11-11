const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const connectdb = require('./repository/db');

const auth = require('./routes/auth');
const meeting = require('./routes/meeting');
const events = require('./routes/events')
const friends = require('./routes/friends');

dotenv.config();

const app = express();
app.use(cors()); // THIS IS SO UNSAFE PLEASE DO NOT LEAVE THIS HERE PERMANENTLY -Corey
connectdb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Please work :3');
});
app.use('/api/auth', auth);
app.use('/api/meeting', meeting);
app.use('/api/events', events);
app.use('/api/friends', friends);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
