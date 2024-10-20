const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./repository/db');

dotenv.config();
const app = express();
connectdb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Please work :3');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
