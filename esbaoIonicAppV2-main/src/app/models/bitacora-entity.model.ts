export interface BitacoraEntity {
  bitacora_id?: number;
  dia_bitacora: number;
  hora_bitacora: string;
  mes_bitacora: string;
  anio: number;
  insidencia: string;
  pdf_bitacora: string | null;
  evidencia_img: string | null; 
  id?: number;
  alumno_id?: number;
  user?: any;
  alumno?: any;
}
