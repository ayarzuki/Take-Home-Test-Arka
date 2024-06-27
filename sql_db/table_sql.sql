CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  start_date DATE,
  contract_value DECIMAL(10, 2)
);

INSERT INTO clients (user_id, start_date, contract_value) VALUES (1, '2024-01-31', 10000.00);

INSERT INTO products (name, description, price) VALUES ('Oil', 'High quality oil', 40.00);
INSERT INTO products (name, description, price) VALUES ('Crude Oil', 'High quality crude oil', 30.00);

INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@gmail.com', 'password123');