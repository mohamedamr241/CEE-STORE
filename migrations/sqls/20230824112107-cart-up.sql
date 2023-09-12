/* Replace with your SQL commands */

CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);