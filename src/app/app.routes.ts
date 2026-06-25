import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { authGuard } from './guards/auth.guard';
import { TareasComponent } from './pages/tareas/tareas.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tareas/:proyectoId',
    component: TareasComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
