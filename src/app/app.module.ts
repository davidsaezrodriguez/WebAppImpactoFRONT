import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from './servicios/usuariosService';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { TablasComponent } from './componentes/tablas/tablas.component';
import { BuscadorComponent } from './componentes/adicionales/buscador/buscador.component';
import { CrearTablasComponent } from './componentes/tablas/crear-tablas/crear-tablas.component';
import { VisualizarTablasComponent } from './componentes/tablas/visualizar-tablas/visualizar-tablas.component';
import { LocalService } from './servicios/localService';
import { TablasService } from './servicios/tablasService';
import { AuthInterceptor } from './servicios/AuthInteceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './componentes/usuarios/crear-usuario/crear-usuario.component';
import { DatosUsuarioComponent } from './componentes/usuarios/datos-usuario/datos-usuario.component';
import { EjerciciosComponent } from './componentes/ejercicios/ejercicios.component';
import { DietasComponent } from './componentes/dietas/dietas.component';
import { SeguimientoComponent } from './componentes/seguimiento/seguimiento.component';
import { ClasesComponent } from './componentes/clases/clases.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    NavbarComponent,
    TablasComponent,
    BuscadorComponent,
    CrearTablasComponent,
    VisualizarTablasComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    DatosUsuarioComponent,
    EjerciciosComponent,
    DietasComponent,
    SeguimientoComponent,
    ClasesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UsuariosService,
    LocalService,
    TablasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
