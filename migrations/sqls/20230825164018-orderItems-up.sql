/* Replace with your SQL commands */
CREATE TABLE orderItems(
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER,
    quantity INTEGER,
    price INTEGER,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);