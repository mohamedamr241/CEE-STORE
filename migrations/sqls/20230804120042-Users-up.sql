/* Replace with your SQL commands */
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50) UNIQUE NOT NULL,
    firstName VARCHAR(100),
    email VARCHAR(60),
    lastName VARCHAR(100),
    password VARCHAR(100),
    isAdmin BOOLEAN DEFAULT false
);