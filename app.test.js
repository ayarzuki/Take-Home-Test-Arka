// app.test.js

const request = require('supertest');
const { app, server } = require('./app.js');
const db = require('./connection/db.js');

afterAll(() => {
  server.close(); // Close the server after all tests
});

describe('GET /products', () => {
  it('should get list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([])); // Adjust as per your response structure
  });

  it('should handle errors gracefully', async () => {
    // Mock the db.query function to throw an error
    jest.spyOn(require('./connection/db.js'), 'query').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/products');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});

describe('POST /products', () => {
  it('should create a new product', async () => {
    const newProduct = {
      product_name: 'New Product',
      description: 'This is a new product',
      price: 99.99,
    };

    // Mock the db.query function to return a mock response
    jest.spyOn(db, 'query').mockResolvedValueOnce({
      rows: [newProduct], // Simulate a successful insertion
    });

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect(201);

    expect(response.body).toMatchObject(newProduct);
  });

  // Add more tests for error handling, validation, etc.
});

describe('PUT /products/:id', () => {
  it('should update an existing product', async () => {
    // Assuming there's a product with ID 1 in your database
    const updatedProduct = {
      product_name: 'Updated Product',
      description: 'This product has been updated',
      price: 129.99,
    };

    // Mock the db.query function to return a mock response
    jest.spyOn(db, 'query').mockResolvedValueOnce({
      rows: [updatedProduct], // Simulate a successful update
    });

    const response = await request(app)
      .put('/products/1')
      .send(updatedProduct)
      .expect(200);

    expect(response.body).toMatchObject(updatedProduct);
  });

  // Add more tests for error handling, product not found, etc.
});

describe('DELETE /products/:id', () => {
  it('should delete an existing product', async () => {
    // Mock the db.query function to return a mock response
    jest.spyOn(db, 'query').mockResolvedValueOnce({
      rowCount: 1, // Simulate successful deletion
    });

    const response = await request(app)
      .delete('/products/1')
      .expect(200);

    expect(response.body).toEqual({ message: 'Product deleted successfully' });
  });
});

describe('GET /clients', () => {
  it('should get list of all clients', async () => {
    const mockClients = [
      { name: 'Client 1', email: 'client1@example.com', start_date: '2024-01-01', contract_value: 1000 },
      { name: 'Client 2', email: 'client2@example.com', start_date: '2024-02-01', contract_value: 1500 },
    ];

    // Mock the db.query function to return a mock response
    jest.spyOn(db, 'query').mockResolvedValueOnce({
      rows: mockClients,
    });

    const response = await request(app)
      .get('/clients')
      .expect(200);

    expect(response.body).toEqual(mockClients);
  });

  // Add more tests for error handling, database errors, etc.
});