import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearTareaRequest, Tarea } from '../models/tarea.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) {}

  listarPorProyecto(proyectoId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`/api/proyectos/${proyectoId}/tareas`);
  }

  crear(proyectoId: number, request: CrearTareaRequest): Observable<Tarea> {
    return this.http.post<Tarea>(`/api/proyectos/${proyectoId}/tareas`, request);
  }
}
