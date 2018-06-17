import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasosComponent } from './pasos/pasos.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';

import { AuthGuard } from './app.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: PasosComponent, canActivate: [AuthGuard] },
  { path: 'puntaje', component: PuntajeComponent, canActivate: [AuthGuard] },
  { path: 'ayuda', component: AyudaComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] },
  { path: 'password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
