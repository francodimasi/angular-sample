import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatGridListModule, MatButtonModule, MatIconModule, MatSidenavModule, MatPaginatorModule, MatListModule, MatCardModule, MatExpansionModule, MatInputModule, MatStepperModule, MatMenuModule, MatSnackBarModule, MatTableModule, MatBadgeModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ProdeComponent } from './prode/prode.component';
import { FixtureComponent } from './fixture/fixture.component';
import { PasosComponent } from './pasos/pasos.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactoComponent } from './contacto/contacto.component';

import { AuthGuard } from './app.guard';
import { BackendService } from './backend.service';
import { JwtInterceptor } from './jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ProdeComponent,
    FixtureComponent,
    PasosComponent,
    PuntajeComponent,
    AyudaComponent,
    ContactoComponent,
    LoginComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatStepperModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    MatBadgeModule
  ],
  providers: [
    AuthGuard,
    BackendService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
