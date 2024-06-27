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

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { product_name, description, price } = req.body;

    const result = await db.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [product_name, description, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, description, price } = req.body;

    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [product_name, description, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      // No rows were affected by the DELETE operation
      return res.status(404).json({ error: 'Product not found' });
    }

    // Product was successfully deleted
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get list of all client's name
app.get('/clients', async (req, res) => {
  try {
    const result = await db.query(`
        SELECT u.name, u.email, c.start_date, c.contract_value
        FROM users u
        INNER JOIN clients c ON c.user_id = u.id;
    `);
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
