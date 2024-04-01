-- Create Database
CREATE DATABASE Utibu_db;

-- Create Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

-- Create Medications table
CREATE TABLE Medications (
    medication_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock_quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
);

-- Create Orders table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Order_Items table
CREATE TABLE Order_Items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    medication_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (medication_id) REFERENCES Medications(medication_id)
);

-- Create Payments table
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Create Statements table
CREATE TABLE Statements (
    statement_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_id INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



INSERT INTO Medications (name, description, stock_quantity, unit_price)
VALUES
    ('Medication A', 'Description of Medication A', 100, 2000),
    ('Medication B', 'Description of Medication B', 150, 1050),
    ('Medication C', 'Description of Medication C', 200, 1200),
    ('Medication D', 'Description of Medication D', 75, 1000),
    ('Medication E', 'Description of Medication E', 120, 1299);


INSERT INTO Users (username, password, email)
VALUES
    ('Nicasio Munyi', 'nick', 'nicasio@gmail.com'),
    ('Nick Alfred', 'alfred', 'alfred @gmail.com'),
    ('John Kim', 'john', 'joohn@gmail.com'),
    ('user4', 'password4', 'user4@gmail.com'),
    ('user5', 'password5', 'user5@gmail.com');

