
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutentificacionService } from './servicios/autentificacionService';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { TablasComponent } from './componentes/tablas/tablas.component';
import { BuscadorComponent } from './componentes/adicionales/buscador/buscador.component';
import { CrearTablasComponent } from './componentes/tablas/crear-tablas/crear-tablas.component';
import { VisualizarTablasComponent } from './componentes/tablas/visualizar-tablas/visualizar-tablas.component';

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
    VisualizarTablasComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AutentificacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
