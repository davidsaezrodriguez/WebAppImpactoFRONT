import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { JwtResponseI } from '../modelos/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalService } from './localService';

@Injectable()
export class AutentificacionService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  ServidorBACKEND = this.heroku;
  authSubject = new BehaviorSubject(false);

  // Variable para descifrar token
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService // Servicio para recuperar datos del localstorage
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion para logear usuario
  loginUsuario(dni: string, password: string): Observable<JwtResponseI> {
    // mandamos en un post a la url del servidor del back, el dni y password que queremos comprobar que esta en bbdd
    return this.httpClient.post<JwtResponseI>(`${this.ServidorBACKEND}/loginUsuario`,
      { dni, password }).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            this.guardarToken(res.datosUsuario.id, res.datosUsuario.accessToken, res.datosUsuario.expiresIn);
          }
        })
      );
  }

  // Funcion para registrar nuevos usuarios
  registrarUsuario(user: Usuario): Observable<JwtResponseI> {
    // mandamos en un post a la url del servidor del back, el usuario que queremos guardar en bbdd
    return this.httpClient.post<JwtResponseI>(`${this.ServidorBACKEND}/registrarUsuario`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            console.log('Usuario registrado');
          }
        })
      );
  }

  // Buscamos los usuarios registrados en la base de datos y devolvemos nombre y id
  public usuariosRegistrados() {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/listarUsuarios`, '');
  }

  //#endregion


  //#region FUNCIONES INTERNAS

  // Funcion que nos guardara el token en el localStorage del navegador
  private guardarToken(id: string, token: string, expiresIn: string): void {
    localStorage.setItem('TokenDeAcceso', token);
    localStorage.setItem('ExpiracionToken', expiresIn);
  }

  //#endregion

}
