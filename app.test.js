// app.test.js

const request = require('supertest');
const { app, server } = require('./app.js');

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
