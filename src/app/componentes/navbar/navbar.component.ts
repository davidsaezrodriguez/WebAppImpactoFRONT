import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  // #region VARIABLES

  // Utiliaremos para actualizar nombre de usuario al logear
  public static updateUserStatus: Subject<boolean> = new Subject();

  // Var para comprobar si la nav esta expandida o no
  navExpandida = false;

  // Datos de usuario logeado
  usuarioLogeado;

  //#endregion

  constructor(
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private router: Router,
  ) {
    NavbarComponent.updateUserStatus.subscribe(res => {
      this.usuarioLogeado = this.localService.getTokenData();
    });
  }

  ngOnInit(): void {
    this.actualizarUsuarioLogeado();
  }

  //#region FUNCIONES

  // Funcion con la que expandimos el navbar para desplegar las opciones en la version movil
  public expandirNav() {
    if (!this.navExpandida) {
      $('#navbar').height(370);
      this.navExpandida = true;
    } else {
      $('#navbar').height(90);
      this.navExpandida = false;
    }
  }

  // Funcion con la que eliminamos el token generado y cerramos sesion
  cerrarSesion(): void {
    this.localService.borrarToken();
    this.router.navigate(['/']);
  }

  // Comporbamos si el usuario esta logeado para mostrar menus de navbar o no
  comprobarAutentificacion() {
    return this.localService.comprobarAutentificacion();
  }

  // Actualizamos usuario logeado al acceder
  actualizarUsuarioLogeado() {
    this.usuarioLogeado = this.localService.getTokenData();
  }

  //#endregion
}
