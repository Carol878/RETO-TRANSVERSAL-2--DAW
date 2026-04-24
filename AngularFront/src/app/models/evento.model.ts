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
    estado?: string;
    plazasDisponibles: number; //
    tipo: {                    //
        idTipo: number;
        nombre: string;
        descripcion: string;
    };
}
