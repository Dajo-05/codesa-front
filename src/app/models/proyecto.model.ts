export type EstadoProyecto = 'ACTIVE' | 'ARCHIVED';

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: EstadoProyecto;
  correoPropietario: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CrearProyectoRequest {
  nombre: string;
  descripcion: string;
}

export interface ActualizarProyectoRequest {
  nombre: string;
  descripcion: string;
}
