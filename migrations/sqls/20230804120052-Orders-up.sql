/* Replace with your SQL commands */
CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    quantity INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    status VARCHAR(10) DEFAULT 'active'
);