CREATE DATABASE IF NOT EXISTS gestion_eventos;
USE gestion_eventos;

CREATE TABLE tipos (
    ID_TIPO INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(45),
    DESCRIPCION VARCHAR(200)
);

CREATE TABLE usuarios (
    USERNAME VARCHAR(45) PRIMARY KEY,
    PASSWORD VARCHAR(45),
    EMAIL VARCHAR(100),
    NOMBRE VARCHAR(30),
    APELLIDOS VARCHAR(45),
    DIRECCION VARCHAR(100),
    ENABLED INT,
    FECHA_REGISTRO DATE
);

CREATE TABLE perfiles (
    ID_PERFIL INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(45)
);

CREATE TABLE eventos (
    ID_EVENTO INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(50),
    DESCRIPCION VARCHAR(200),
    FECHA_INICIO DATE,
    DURACION INT,
    DIRECCION VARCHAR(100),
    ESTADO ENUM('Activo', 'Cancelado', 'Finalizado'), 
    DESTACADO ENUM('S', 'N'), /* Qué eventos tienen prioridad 'S - prioritarios, N - no prioritarios' */ 
    AFORO_MAXIMO INT,
    MINIMO_ASISTENCIA INT,
    PRECIO DECIMAL(9,2),
    ID_TIPO INT,
    FOREIGN KEY (ID_TIPO) REFERENCES tipos(ID_TIPO)
);

CREATE TABLE usuario_perfiles (
    USERNAME VARCHAR(45),
    ID_PERFIL INT,
    PRIMARY KEY (USERNAME, ID_PERFIL),
    FOREIGN KEY (USERNAME) REFERENCES usuarios(USERNAME),
    FOREIGN KEY (ID_PERFIL) REFERENCES perfiles(ID_PERFIL)
);

CREATE TABLE reservas (
    ID_RESERVA INT PRIMARY KEY AUTO_INCREMENT,
    ID_EVENTO INT,
    USERNAME VARCHAR(45),
    PRECIO_VENTA DECIMAL(9,2),
    OBSERVACIONES VARCHAR(200),
    CANTIDAD INT,
    FOREIGN KEY (ID_EVENTO) REFERENCES eventos(ID_EVENTO),
    FOREIGN KEY (USERNAME) REFERENCES usuarios(USERNAME)
);

INSERT INTO tipos (NOMBRE, DESCRIPCION) VALUES
('Concierto', 'Eventos musicales en vivo'),
('Concierto', 'Eventos musicales en vivo');

INSERT INTO usuarios (USERNAME, PASSWORD, EMAIL, NOMBRE, APELLIDOS, DIRECCION, ENABLED, FECHA_REGISTRO) VALUES
('jgarcia', 'claveSegura1', 'jgarcia@email.com', 'Juan', 'García', 'Calle Mayor 10', 1, '2026-03-15'),
('mlopez', 'claveSegura2', 'mlopez@email.com', 'María', 'López', 'Avenida Libertad 5', 1, '2026-03-15');

INSERT INTO perfiles (NOMBRE) VALUES
('Administrador'),
('Usuario Estándar');

INSERT INTO eventos (NOMBRE, DESCRIPCION, FECHA_INICIO, DURACION, DIRECCION, ESTADO, DESTACADO, AFORO_MAXIMO, MINIMO_ASISTENCIA, PRECIO, ID_TIPO) VALUES
('Festival Indie', 'Música independiente', '2026-07-15', 300, 'Parque Central', 'Activo', 'S', 1000, 100, 45.00, 1),
('Festival de metal', 'Música Metal', '2026-04-10', 500, 'Madrid Río', 'Activo', 'N', 30, 10, 60.00, 2);

INSERT INTO usuario_perfiles (USERNAME, ID_PERFIL) VALUES
('jgarcia', 1),
('mlopez', 2);

INSERT INTO reservas (ID_EVENTO, USERNAME, PRECIO_VENTA, OBSERVACIONES, CANTIDAD) VALUES
(1, 'mlopez', 90.00, 'Entradas VIP', 2),
(2, 'jgarcia', 0.00, 'Entrada general', 5);

SELECT NOMBRE, FECHA_INICIO, PRECIO 
FROM eventos 
WHERE DESTACADO = 'S' AND ESTADO = 'Activo';