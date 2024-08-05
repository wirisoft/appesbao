export interface TutorEntity {
    tutor_id: number;
    nombre_tutor: string;
    tipo_tutor: string;
    telefono_tutor: string;
    email_tutor:string;

    id?: number;
    alumno_id?: number;
    
    tutor?: any;
    alumno?: any;

    

}