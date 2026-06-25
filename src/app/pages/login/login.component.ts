import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error = '';
  cargando = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Ingresa correo y contraseña válidos.';
      return;
    }

    this.cargando = true;

    const request = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/proyectos']);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'Credenciales inválidas.';
      }
    });
  }

  usarUsuarioDemo(): void {
    this.form.patchValue({
      email: 'user@codesa.com',
      password: 'User123*'
    });
  }

  usarAdminDemo(): void {
    this.form.patchValue({
      email: 'admin@codesa.com',
      password: 'Admin123*'
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }
}
