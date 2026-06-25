export type EstadoTarea = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
  proyectoId: number;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CrearTareaRequest {
  titulo: string;
  descripcion: string;
}
