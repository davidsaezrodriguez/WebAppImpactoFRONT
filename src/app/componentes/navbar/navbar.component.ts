import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // VARIABLES

  // Var para comprobar si la nav esta expandida o no
  navExpandida = false;


  constructor(
    private autentificacionService: AutentificacionService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  // FUNCIONES

  // Funcion con la que expandimos el navbar para desplegar las opciones en la version movil
  public expandirNav() {
    if (!this.navExpandida) {
      $('#navbar').height(300);
      this.navExpandida = true;
    } else {
      $('#navbar').height(90);
      this.navExpandida = false;
    }
  }

  // Funcion con la que eliminamos el token generado y cerramos sesion 
  cerrarSesion(): void {
    this.autentificacionService.borrarToken();
    this.router.navigate(['/']);
  }

  comprobarAutentificacion() {
    return this.autentificacionService.comprobarAutentificacion();
}
}
