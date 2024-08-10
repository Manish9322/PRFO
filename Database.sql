-- Create a new database
CREATE DATABASE demo_db;

-- Use the new database
USE demo_db;

-- Create the userdata table
CREATE TABLE userdata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
