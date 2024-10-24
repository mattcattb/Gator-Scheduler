const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./repository/db');
const auth = require('./routes/auth');
const login = require('./routes/login');

dotenv.config();
const app = express();
connectdb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Please work :3');
});

app.use('/api/auth', auth);
app.use('/api/login', login);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
