INSERT INTO suppliers (name, email, phone) VALUES ('Supplier 1', 'supplier1@example.com', '123456789');
INSERT INTO products (name, stock, supplier_id) VALUES ('Product 1', 35, 1);
INSERT INTO movements (product_id, type, description) VALUES (1, 'create', 'Created product');