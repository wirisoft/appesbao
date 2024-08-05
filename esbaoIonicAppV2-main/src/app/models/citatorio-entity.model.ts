export interface CitatorioEntity {
  citatorio_id: number;
  nombre_citatorio: string;
  asunto: string;
  dia_citatorio: number;
  mes_citatorio: string;
  ano_citatorio: string;
  hora_citatorio: string;
  fecha_citatorio: string;
  departamento: string;
  id?: number;
  alumno_id?: number;
  tutor_id?: number;
  tutor?: { id: any };
  alumno?: { id: any };
}