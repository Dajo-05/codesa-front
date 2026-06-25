import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActualizarProyectoRequest,
  CrearProyectoRequest,
  Proyecto
} from '../models/proyecto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private readonly apiUrl = '/api/proyectos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/${id}`);
  }

  crear(request: CrearProyectoRequest): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, request);
  }

  actualizar(id: number, request: ActualizarProyectoRequest): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiUrl}/${id}`, request);
  }

  archivar(id: number): Observable<Proyecto> {
    return this.http.patch<Proyecto>(`${this.apiUrl}/${id}/archivar`, {});
  }
}
