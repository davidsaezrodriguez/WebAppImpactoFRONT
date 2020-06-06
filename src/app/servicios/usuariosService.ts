import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UsuariosService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  ServidorBACKEND = this.local;
  authSubject = new BehaviorSubject(false);

  // Variable para descifrar token
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion para logear usuario
  loginUsuario(dni: string, password: string): Observable<any> {
    // mandamos en un post a la url del servidor del back, el dni y password que queremos comprobar que esta en bbdd
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/loginUsuario`,
      { dni, password }).pipe(tap(
        (res: any) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            this.guardarToken(res.accessToken);
          }
        })
      );
  }

  // Funcion para registrar nuevos usuarios
  registrarUsuario(user: Usuario): Observable<any> {
    // mandamos en un post a la url del servidor del back, el usuario que queremos guardar en bbdd
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/registrarUsuario`,
      user).pipe(tap(
        (res) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            console.log('Usuario registrado');
          }
        })
      );
  }

  // Buscamos los usuarios registrados en la base de datos y devolvemos nombre y id
  usuariosRegistrados() {
    return this.httpClient.get<any>(`${this.ServidorBACKEND}/listarUsuarios`);
  }

  // Buscamos usuarios con el nivel acceso indicado. El nivel habra que mandarle en formato { "acceso" : [1,3,4] }
  usuariosNivelAcceso(acceso) {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/listarUsuariosFiltrarNivel`, { acceso });
  }

  // Buscamos usuario con api en bbdd para usar sus datos
  buscarUsuario(idUsuario) {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/buscarUsuario`, { idUsuario });
  }

  // Funcion para cambiar contraseña
  cambiarContraseña(contraVieja, contraNueva, idUsuario): Observable<any> {
    // mandamos en un post a la url del servidor del back las dos contraseñas para comprobar y cambiar
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/cambiarContrasena`, { contraVieja, contraNueva, idUsuario });
  }

  // Funcion para cambiar contraseña
  modificarDatosUsuario(user: Usuario): Observable<any> {
    // mandamos en un post a la url del servidor del back las dos contraseñas para comprobar y cambiar
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/modificarDatosUsuario`,  user );
  }

  //#endregion


  //#region FUNCIONES INTERNAS

  // Funcion que nos guardara el token en el localStorage del navegador
  private guardarToken(token: string): void {
    localStorage.setItem('TokenDeAcceso', token);
  }

  //#endregion

}
