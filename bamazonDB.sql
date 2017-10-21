DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(19,4) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("guitar", "music", 499.99, 15), ("amp", "music", 99.99, 15), ("hat", "clothing", 19.99, 30), 
("legos", "toys", 39.99, 50), ("camera", "electronics", 149.99, 20), ("SD Card", "electronics", 49.99, 100), ("dog food", "food", 4.99, 150), 
("mountain bike", "outdoors", 399.99, 10), ("underwear", "clothing", 9.99, 50), ("video game", "toys", 49.99, 40);