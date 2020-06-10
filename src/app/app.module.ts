import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { VisualizarEjerciciosComponent } from './componentes/ejercicios/visualizar-ejercicios/visualizar-ejercicios.component';
import { DetallesEjercicioComponent } from './componentes/ejercicios/visualizar-ejercicios/detalles-ejercicio/detalles-ejercicio.component';
import { EjerciciosService } from './servicios/ejerciciosService';
import { CrearEjerciciosComponent } from './componentes/ejercicios/crear-ejercicios/crear-ejercicios.component';
import { DietasService } from './servicios/dietasService';
import { CrearDietasComponent } from './componentes/dietas/crear-dietas/crear-dietas.component';
import { VisualizarDietasComponent } from './componentes/dietas/visualizar-dietas/visualizar-dietas.component';
import { SeguimientosService } from './servicios/seguimientosService';
import localeEs from '@angular/common/locales/es';
import { ClasesService } from './servicios/clasesService';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { UtilCalendarioCabeceraComponent } from './componentes/adicionales/util-calendario/util-calendario-cabecera/util-calendario-cabecera.component';
import { AdministrarClasesComponent } from './componentes/clases/administrar-clases/administrar-clases.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

registerLocaleData(localeEs, 'es');
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
    ClasesComponent,
    VisualizarEjerciciosComponent,
    DetallesEjercicioComponent,
    CrearEjerciciosComponent,
    CrearDietasComponent,
    VisualizarDietasComponent,
    UtilCalendarioCabeceraComponent,
    AdministrarClasesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    UsuariosService,
    LocalService,
    TablasService,
    EjerciciosService,
    DietasService,
    SeguimientosService,
    ClasesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
