import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Proyecto } from '../../models/proyecto.model';
import { UsuarioSesion } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos.component.html'
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];

  mensaje = '';
  error = '';
  cargando = false;

  editando = false;
  proyectoEditandoId: number | null = null;

  usuario: UsuarioSesion | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = this.authService.getUser();

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.limpiarMensajes();
    this.cargando = true;

    this.proyectoService.listar().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'No se pudieron cargar los proyectos.';
      }
    });
  }

  guardar(): void {
    this.limpiarMensajes();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisa los campos del formulario.';
      return;
    }

    const request = {
      nombre: this.form.value.nombre ?? '',
      descripcion: this.form.value.descripcion ?? ''
    };

    if (this.editando && this.proyectoEditandoId !== null) {
      this.proyectoService.actualizar(this.proyectoEditandoId, request).subscribe({
        next: () => {
          this.mensaje = 'Proyecto actualizado correctamente.';
          this.cancelarEdicion();
          this.cargarProyectos();
        },
        error: (err) => {
          this.error = err.error?.message || 'No se pudo actualizar el proyecto.';
        }
      });

      return;
    }

    this.proyectoService.crear(request).subscribe({
      next: () => {
        this.mensaje = 'Proyecto creado correctamente.';
        this.form.reset();
        this.cargarProyectos();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo crear el proyecto.';
      }
    });
  }

  editar(proyecto: Proyecto): void {
    this.limpiarMensajes();

    this.editando = true;
    this.proyectoEditandoId = proyecto.id;

    this.form.patchValue({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.proyectoEditandoId = null;
    this.form.reset();
  }

  archivar(proyecto: Proyecto): void {
    this.limpiarMensajes();

    if (proyecto.estado === 'ARCHIVED') {
      this.error = 'El proyecto ya está archivado.';
      return;
    }

    const confirmar = confirm(`¿Deseas archivar el proyecto "${proyecto.nombre}"?`);

    if (!confirmar) {
      return;
    }

    this.proyectoService.archivar(proyecto.id).subscribe({
      next: () => {
        this.mensaje = 'Proyecto archivado correctamente.';
        this.cargarProyectos();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se pudo archivar el proyecto.';
      }
    });
  }

  verTareas(proyecto: Proyecto): void {
    this.router.navigate(['/tareas', proyecto.id]);
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

  estadoClase(proyecto: Proyecto): string {
    return proyecto.estado === 'ACTIVE' ? 'bg-success' : 'bg-secondary';
  }
}
