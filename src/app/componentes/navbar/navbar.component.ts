import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from 'src/app/servicios/loginService';
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
    private loginService: LoginService,
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
    this.loginService.borrarToken();
    this.router.navigate(['/']);
  }
}
