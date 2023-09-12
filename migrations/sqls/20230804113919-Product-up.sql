/* Replace with your SQL commands */
CREATE TABLE Product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price INTEGER,
    quantity INTEGER,
    category VARCHAR(100),
    description TEXT,
    reviews INTEGER,
    image VARCHAR(255) DEFAULT 'unknown'
);