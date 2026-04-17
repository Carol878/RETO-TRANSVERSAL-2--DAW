DROP DATABASE gestion_eventos;
CREATE DATABASE gestion_eventos;
USE gestion_eventos;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion_eventos
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- ==========================================================
-- 1. TABLAS INDEPENDIENTES (Sin Claves Foráneas)
-- ==========================================================

--
-- Table structure for table `tipos`
--
DROP TABLE IF EXISTS `tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos` (
                         `ID_TIPO` int NOT NULL AUTO_INCREMENT,
                         `NOMBRE` varchar(45) DEFAULT NULL,
                         `DESCRIPCION` varchar(200) DEFAULT NULL,
                         PRIMARY KEY (`ID_TIPO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `tipos` WRITE;
/*!40000 ALTER TABLE `tipos` DISABLE KEYS */;
INSERT INTO `tipos` VALUES (1,'Maratones','Eventos deportivos en vivo'),(2,'Concierto','Eventos musicales en vivo');
/*!40000 ALTER TABLE `tipos` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `usuarios`
--
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
                            `USERNAME` varchar(45) NOT NULL,
                            `PASSWORD` varchar(45) DEFAULT NULL,
                            `EMAIL` varchar(100) DEFAULT NULL,
                            `NOMBRE` varchar(30) DEFAULT NULL,
                            `APELLIDOS` varchar(45) DEFAULT NULL,
                            `DIRECCION` varchar(100) DEFAULT NULL,
                            `ENABLED` int DEFAULT NULL,
                            `FECHA_REGISTRO` date DEFAULT NULL,
                            PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('jgarcia','{noop}claveSegura1','jgarcia@email.com','Juan','García','Calle Mayor 10',1,'2026-03-15'),('mlopez','{noop}claveSegura2','mlopez@email.com','María','López','Avenida Libertad 5',1,'2026-03-15'),('pgranados','{noop}123','ddd','Pablo','Granados','Calle 2',1,'2026-04-08');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `perfiles`
--
DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfiles` (
                            `ID_PERFIL` int NOT NULL AUTO_INCREMENT,
                            `NOMBRE` varchar(45) DEFAULT NULL,
                            PRIMARY KEY (`ID_PERFIL`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
INSERT INTO `perfiles` VALUES (1,'ROLE_ADMON'),(2,'ROLE_CLIENTE');
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;


-- ==========================================================
-- 2. TABLAS DEPENDIENTES (Con Claves Foráneas)
-- ==========================================================

--
-- Table structure for table `eventos`
--
DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
                           `ID_EVENTO` int NOT NULL AUTO_INCREMENT,
                           `NOMBRE` varchar(50) DEFAULT NULL,
                           `DESCRIPCION` varchar(200) DEFAULT NULL,
                           `FECHA_INICIO` date DEFAULT NULL,
                           `DURACION` int DEFAULT NULL,
                           `DIRECCION` varchar(100) DEFAULT NULL,
                           `ESTADO` enum('ACTIVO','CANCELADO','FINALIZADO') DEFAULT NULL,
                           `DESTACADO` enum('S','N') DEFAULT NULL,
                           `AFORO_MAXIMO` int DEFAULT NULL,
                           `MINIMO_ASISTENCIA` int DEFAULT NULL,
                           `PRECIO` decimal(9,2) DEFAULT NULL,
                           `ID_TIPO` int DEFAULT NULL,
                           PRIMARY KEY (`ID_EVENTO`),
                           KEY `ID_TIPO` (`ID_TIPO`),
                           CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`ID_TIPO`) REFERENCES `tipos` (`ID_TIPO`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Festival Indie','Música independiente','2026-07-15',300,'Parque Central','ACTIVO','S',1000,100,45.00,1),
                             (2,'Festival de metal','Música Metal','2026-04-10',500,'Madrid Río','ACTIVO','N',30,10,60.00,2),
                             (11,'Concierto de Rock','Gran concierto con las mejores bandas de rock sinfónico de la ciudad','2026-05-15',180,'Auditorio Nacional, Calle Principal 123, Madrid','ACTIVO','S',500,50,45.50,2);
INSERT INTO `eventos` (nombre, descripcion, fecha_inicio, duracion, direccion, estado, destacado, aforo_maximo, minimo_asistencia, precio, id_tipo) VALUES
                                                                                                                                                        ('Pop Summer Fest', 'Los mejores artistas del pop actual bajo el sol.', '2026-08-20', 360, 'Estadio Olímpico, Sevilla', 'ACTIVO', 'S', 5000, 500, 55.00, 2),
                                                                                                                                                        ('Jazz Under the Stars', 'Una noche mágica de jazz clásico y contemporáneo.', '2026-09-05', 180, 'Jardines de Sabatini, Madrid', 'ACTIVO', 'N', 300, 30, 40.00, 2),
                                                                                                                                                        ('Techno Warehouse', '12 horas de música electrónica sin interrupciones.', '2026-10-31', 720, 'Nave 16 - Matadero, Madrid', 'ACTIVO', 'S', 1500, 100, 35.00, 2),
                                                                                                                                                        ('Gala de Ópera', 'Selección de las mejores arias de Verdi y Puccini.', '2026-11-15', 120, 'Teatro Real, Madrid', 'ACTIVO', 'N', 1200, 100, 85.00, 2),
                                                                                                                                                        ('Reggaeton Beach Tour', 'El festival de música urbana más grande del verano.', '2026-07-28', 480, 'Playa de la Malvarrosa, Valencia', 'ACTIVO', 'S', 8000, 1000, 50.00, 2);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `usuario_perfiles`
--
DROP TABLE IF EXISTS `usuario_perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_perfiles` (
                                    `USERNAME` varchar(45) NOT NULL,
                                    `ID_PERFIL` int NOT NULL,
                                    PRIMARY KEY (`USERNAME`,`ID_PERFIL`),
                                    KEY `ID_PERFIL` (`ID_PERFIL`),
                                    CONSTRAINT `usuario_perfiles_ibfk_1` FOREIGN KEY (`USERNAME`) REFERENCES `usuarios` (`USERNAME`),
                                    CONSTRAINT `usuario_perfiles_ibfk_2` FOREIGN KEY (`ID_PERFIL`) REFERENCES `perfiles` (`ID_PERFIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `usuario_perfiles` WRITE;
/*!40000 ALTER TABLE `usuario_perfiles` DISABLE KEYS */;
INSERT INTO `usuario_perfiles` VALUES ('jgarcia',1),('mlopez',2),('pgranados',2);
/*!40000 ALTER TABLE `usuario_perfiles` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `reservas`
--
DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
                            `ID_RESERVA` int NOT NULL AUTO_INCREMENT,
                            `ID_EVENTO` int DEFAULT NULL,
                            `USERNAME` varchar(45) DEFAULT NULL,
                            `PRECIO_VENTA` decimal(9,2) DEFAULT NULL,
                            `OBSERVACIONES` varchar(200) DEFAULT NULL,
                            `CANTIDAD` int DEFAULT NULL,
                            PRIMARY KEY (`ID_RESERVA`),
                            KEY `ID_EVENTO` (`ID_EVENTO`),
                            KEY `USERNAME` (`USERNAME`),
                            CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`ID_EVENTO`) REFERENCES `eventos` (`ID_EVENTO`),
                            CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`USERNAME`) REFERENCES `usuarios` (`USERNAME`),
                            CONSTRAINT `reservas_chk_1` CHECK ((`CANTIDAD` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,1,'mlopez',90.00,'Entradas VIP',2),(2,2,'jgarcia',0.00,'Entrada general',5);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-09 10:14:55