-- Tabla de movimientos (historial de cambios)
CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete'
    description TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id)
);