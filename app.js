// app.cjs
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./connection/db.js');

const app = express();
app.use(bodyParser.json());

// Get list of all products
app.get('/products', async (req, res) => {
  try {
    // Simulate an error by throwing an exception
    const result = await db.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
