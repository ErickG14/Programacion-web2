-- Base de datos para el login
CREATE DATABASE IF NOT EXISTS login_carros;
USE login_carros;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100)
);

-- Insertar un usuario de prueba
INSERT INTO usuarios (username, password, email) 
VALUES ('admin', 'admin123', 'admin@carros.com');

-- Base de datos para los carros
CREATE DATABASE IF NOT EXISTS sistema_carros;
USE sistema_carros;

CREATE TABLE carros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  año INT NOT NULL,
  color VARCHAR(50),
  precio DECIMAL(10,2),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos carros de ejemplo
INSERT INTO carros (marca, modelo, año, color, precio) VALUES
('Toyota', 'Corolla', 2023, 'Blanco', 25000.00),
('Honda', 'Civic', 2022, 'Negro', 23000.00),
('Ford', 'Mustang', 2024, 'Rojo', 45000.00);



USE sistema_carros;

-- Si no tienes la tabla usuarios, créala:
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activo TINYINT DEFAULT 1
);

-- Asegúrate de tener al menos el usuario admin:
INSERT IGNORE INTO usuarios (username, password, email) 
VALUES ('admin', 'admin123', 'admin@carros.com');