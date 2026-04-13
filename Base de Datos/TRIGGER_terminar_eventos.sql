DROP TRIGGER IF EXISTS eventos_before_insert;
DROP TRIGGER IF EXISTS eventos_before_update;

DELIMITER $$

-- Trigger para INSERT
CREATE TRIGGER eventos_before_insert
BEFORE INSERT ON eventos
FOR EACH ROW
BEGIN
    -- Si la fecha de inicio es anterior a hoy -> FINALIZADO
    IF NEW.FECHA_INICIO < CURDATE() THEN
        SET NEW.ESTADO = 'FINALIZADO';
    ELSE
        -- Si no, ACTIVO por defecto
        SET NEW.ESTADO = 'ACTIVO';
    END IF;
END$$

-- Trigger para UPDATE
CREATE TRIGGER eventos_before_update
BEFORE UPDATE ON eventos
FOR EACH ROW
BEGIN
    -- Si la fecha de inicio es anterior a hoy y no está cancelado -> FINALIZADO
    IF NEW.FECHA_INICIO < CURDATE() AND NEW.ESTADO != 'CANCELADO' THEN
        SET NEW.ESTADO = 'FINALIZADO';
    END IF;
END$$

DELIMITER ;

-- Habilitar el planificador de eventos (si no está)
SET GLOBAL event_scheduler = ON;

-- Crear evento que actualiza automáticamente
DROP EVENT IF EXISTS actualizar_eventos_diariamente;

DELIMITER $$

CREATE EVENT actualizar_eventos_diariamente
ON SCHEDULE EVERY 1 DAY
STARTS CURDATE() + INTERVAL 1 DAY
DO
BEGIN
    UPDATE eventos 
    SET ESTADO = 'FINALIZADO'
    WHERE FECHA_INICIO < CURDATE() 
    AND ESTADO != 'CANCELADO'
    AND ESTADO != 'FINALIZADO';
END$$

DELIMITER ;