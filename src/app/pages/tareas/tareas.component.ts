import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Proyecto } from '../../models/proyecto.model';
import { Tarea } from '../../models/tarea.model';
import { UsuarioSesion } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ProyectoService } from '../../services/proyecto.service';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {

  proyectoId!: number;
  proyecto: Proyecto | null = null;
  tareas: Tarea[] = [];

  mensaje = '';
  error = '';
  cargando = false;

  usuario: UsuarioSesion | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService,
    private tareaService: TareaService,
    private authService: AuthService
  ) {
    this.usuario = this.authService.getUser();

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      descripcion: ['', [Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.proyectoId = Number(this.route.snapshot.paramMap.get('proyectoId'));

    if (!this.proyectoId) {
      this.router.navigate(['/proyectos']);
      return;
    }

    this.cargarProyecto();
    this.cargarTareas();
  }

  cargarProyecto(): void {
    this.proyectoService.buscarPorId(this.proyectoId).subscribe({
      next: (data) => {
        this.proyecto = data;
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo cargar el proyecto.';
      }
    });
  }

  cargarTareas(): void {
    this.cargando = true;

    this.tareaService.listarPorProyecto(this.proyectoId).subscribe({
      next: (data) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'No se pudieron cargar las tareas.';
      }
    });
  }

  crearTarea(): void {
    this.limpiarMensajes();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisa los campos de la tarea.';
      return;
    }

    const request = {
      titulo: this.form.value.titulo ?? '',
      descripcion: this.form.value.descripcion ?? ''
    };

    this.tareaService.crear(this.proyectoId, request).subscribe({
      next: () => {
        this.mensaje = 'Tarea creada correctamente.';
        this.form.reset();
        this.cargarTareas();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo crear la tarea.';
      }
    });
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  limpiarMensajes(): void {
    this.mensaje = '';
    this.error = '';
  }

  proyectoArchivado(): boolean {
    return this.proyecto?.estado === 'ARCHIVED';
  }
}
