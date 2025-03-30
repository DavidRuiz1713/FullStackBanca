-- Creación de la base de datos
CREATE DATABASE bank_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c bank_db

-- Tabla Persona (base para Cliente)
CREATE TABLE personas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    edad INTEGER,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Cliente (hereda de Persona)
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL UNIQUE,
    cliente_id VARCHAR(20) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE
);

-- Tabla Cuenta
CREATE TABLE cuentas (
    id SERIAL PRIMARY KEY,
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    tipo_cuenta VARCHAR(20) NOT NULL,
    saldo_inicial DECIMAL(19,2) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    cliente_id INTEGER NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    CONSTRAINT saldo_positivo CHECK (saldo_inicial >= 0)
);

-- Tabla Movimientos
CREATE TABLE movimientos (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_movimiento VARCHAR(20) NOT NULL,
    valor DECIMAL(19,2) NOT NULL,
    saldo DECIMAL(19,2) NOT NULL,
    cuenta_id INTEGER NOT NULL,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id) ON DELETE CASCADE,
    CONSTRAINT valor_positivo CHECK (valor > 0)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_cuentas_cliente ON cuentas(cliente_id);
CREATE INDEX idx_movimientos_cuenta ON movimientos(cuenta_id);
CREATE INDEX idx_movimientos_fecha ON movimientos(fecha);

-- 1. Creación de Usuarios
INSERT INTO personas (nombre, direccion, telefono)
VALUES 
('Jose Lema', 'Otavalo sn y principal', '098254785'),
('Marianela Montalvo', 'Amazonas y NNUU', '097548965'),
('Juan Osorio', '13 junio y Equinoccial', '098874587');

INSERT INTO clientes (persona_id, cliente_id, contrasena, estado)
VALUES 
(1, 'CLI001', '1234', true),
(2, 'CLI002', '5678', true),
(3, 'CLI003', '1245', true);

-- 2. Creación de Cuentas de Usuario
INSERT INTO cuentas (numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id)
VALUES 
('478758', 'Ahorro', 2000.00, true, 1),
('225487', 'Corriente', 100.00, true, 2),
('495878', 'Ahorros', 0.00, true, 3),
('496825', 'Ahorros', 540.00, true, 2);

-- 3. Crear una nueva Cuenta Corriente para Jose Lema
INSERT INTO cuentas (numero_cuenta, tipo_cuenta, saldo_inicial, estado, cliente_id)
VALUES 
('585545', 'Corriente', 1000.00, true, 1);

-- 4. Realizar los movimientos
-- Movimiento 1: Retiro de 575 de la cuenta 478758
INSERT INTO movimientos (tipo_movimiento, valor, saldo, cuenta_id)
VALUES ('Retiro', 575.00, (SELECT saldo_inicial - 575 FROM cuentas WHERE numero_cuenta = '478758'), 
        (SELECT id FROM cuentas WHERE numero_cuenta = '478758'));

-- Movimiento 2: Depósito de 600 en la cuenta 225487
INSERT INTO movimientos (tipo_movimiento, valor, saldo, cuenta_id)
VALUES ('Depósito', 600.00, (SELECT saldo_inicial + 600 FROM cuentas WHERE numero_cuenta = '225487'), 
        (SELECT id FROM cuentas WHERE numero_cuenta = '225487'));

-- Movimiento 3: Depósito de 150 en la cuenta 495878
INSERT INTO movimientos (tipo_movimiento, valor, saldo, cuenta_id)
VALUES ('Depósito', 150.00, (SELECT saldo_inicial + 150 FROM cuentas WHERE numero_cuenta = '495878'), 
        (SELECT id FROM cuentas WHERE numero_cuenta = '495878'));

-- Movimiento 4: Retiro de 540 de la cuenta 496825
INSERT INTO movimientos (tipo_movimiento, valor, saldo, cuenta_id)
VALUES ('Retiro', 540.00, (SELECT saldo_inicial - 540 FROM cuentas WHERE numero_cuenta = '496825'), 
        (SELECT id FROM cuentas WHERE numero_cuenta = '496825'));

-- Vistas útiles
CREATE VIEW vista_movimientos_clientes AS
SELECT 
    m.id,
    m.fecha,
    m.tipo_movimiento,
    m.valor,
    m.saldo,
    c.numero_cuenta,
    p.nombre as cliente_nombre
FROM movimientos m
JOIN cuentas c ON m.cuenta_id = c.id
JOIN clientes cl ON c.cliente_id = cl.id
JOIN personas p ON cl.persona_id = p.id;

-- Funciones almacenadas
CREATE OR REPLACE FUNCTION actualizar_saldo()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.tipo_movimiento = 'Depósito' THEN
        UPDATE cuentas 
        SET saldo_inicial = saldo_inicial + NEW.valor 
        WHERE id = NEW.cuenta_id;
    ELSIF NEW.tipo_movimiento = 'Retiro' THEN
        UPDATE cuentas 
        SET saldo_inicial = saldo_inicial - NEW.valor 
        WHERE id = NEW.cuenta_id;
    END IF;
    
    NEW.saldo := (SELECT saldo_inicial FROM cuentas WHERE id = NEW.cuenta_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER trigger_actualizar_saldo
BEFORE INSERT ON movimientos
FOR EACH ROW
EXECUTE FUNCTION actualizar_saldo();

-- Usuario para la aplicación
CREATE ROLE bank_app WITH LOGIN PASSWORD 'bank_password';
GRANT CONNECT ON DATABASE bank_db TO bank_app;
GRANT USAGE ON SCHEMA public TO bank_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO bank_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO bank_app;