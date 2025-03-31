-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de usuários iniciais
INSERT INTO users (name, email, password)
VALUES
    ('Alice Silva', 'alice@example.com', '$2a$14$BQCZ3nUAZ4XK27bvlpWFiONakYfIpOJZfvUzozB5swz1YPQWjCPeq'), -- senha: 123456
    ('Bruno Costa', 'bruno@example.com', '$2a$14$3Gv1kS0kpEwKq2I1ErV8ReyKQgjNBlx.M7ohxOrTTQQrs9QFZImJG'); -- senha: abc123

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de produtos iniciais
INSERT INTO products (name, description, price)
VALUES
    ('Camiseta Tech', 'Camiseta confortável de algodão com estampa tecnológica.', 49.90),
    ('Caneca Dev', 'Caneca de porcelana com estampa de código.', 29.90),
    ('Teclado Mecânico', 'Teclado com switches azuis, ideal para programação.', 299.90);
