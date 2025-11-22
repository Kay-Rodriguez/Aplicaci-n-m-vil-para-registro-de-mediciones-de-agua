import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { NuevaLecturaPage } from './pages/nueva-lectura/nueva-lectura.page';
import { AdminPage } from './pages/admin/admin.page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'nueva-lectura', component: NuevaLecturaPage },
  { path: 'admin', component: AdminPage }
];
