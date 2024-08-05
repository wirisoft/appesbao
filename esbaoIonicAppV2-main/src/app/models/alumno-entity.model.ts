export interface AlumnoEntity {
    alumno_id: number;
    nombre_alumno: string;
    primer_apellido: string;
    segundo_apellido: string;
    turno: string; 
    grado: string;
    grupo: string;
    matricula: string;
    area_especialidad: string;
    telefono: string;
    id?: number;

    
    user?: any;
    
}