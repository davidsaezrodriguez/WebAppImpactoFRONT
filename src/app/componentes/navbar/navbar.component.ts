import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  // VARIABLES

  // Utiliaremos para actualizar nombre de usuario al logear
  public static updateUserStatus: Subject<boolean> = new Subject();

  // Var para comprobar si la nav esta expandida o no
  navExpandida = false;

  // Datos de usuario logeado
  usuarioLogeado;


  // FUNCIONES

  constructor(
    private autentificacionService: AutentificacionService,
    private router: Router,
  ) {
    NavbarComponent.updateUserStatus.subscribe(res => {
      this.usuarioLogeado = this.autentificacionService.getTokenData();
    });
  }

  ngOnInit(): void {
    this.actualizarUsuarioLogeado();
  }

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

  // Comporbamos si el usuario esta logeado para mostrar menus de navbar o no
  comprobarAutentificacion() {
    return this.autentificacionService.comprobarAutentificacion();
  }

  // Actualizamos usuario logeado al acceder
  actualizarUsuarioLogeado() {
    this.usuarioLogeado = this.autentificacionService.getTokenData();
  }
}
