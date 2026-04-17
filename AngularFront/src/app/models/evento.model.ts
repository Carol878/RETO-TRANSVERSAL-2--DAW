export interface Evento {
    idEvento: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string; // o Date si lo tienes configurado así
    duracion: number;
    direccion: string;
    destacado: string;
    aforoMaximo: number;
    minimoAsistencia: number;
    precio: number;
    plazasDisponibles: number; // ¡Aquí estaba el error! Faltaba esta línea
    tipo: {                    // ¡Y faltaba definir el objeto tipo!
        idTipo: number;
        nombre: string;
        descripcion: string;
    };
}
