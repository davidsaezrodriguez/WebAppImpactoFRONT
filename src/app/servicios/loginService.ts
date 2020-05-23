import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { JwtResponseI } from '../modelos/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class LoginService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  ServidorBACKEND = this.heroku || this.local  ;
  authSubject = new BehaviorSubject(false);

  // Creamos token
  private token: string;
  constructor(
    private httpClient: HttpClient
  ) {

  }

  // Funcion para registrar nuevos usuarios
  registrarUsuario(user: Usuario): Observable<JwtResponseI> {
    // mandamos en un post a la url del servidor del back, el usuario que queremos guardar en bbdd
    return this.httpClient.post<JwtResponseI>(`${this.ServidorBACKEND}/registrarUsuario`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            this.guardarToken(res.datosUsuario.accessToken, res.datosUsuario.expiresIn);
          }
        })
      );
  }

  loginUsuario(user: Usuario): Observable<JwtResponseI> {
    // mandamos en un post a la url del servidor del back, el usuario que queremos comprobar que esta en bbdd
    return this.httpClient.post<JwtResponseI>(`${this.ServidorBACKEND}/loginUsuario`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // Si el back funciona correctamente la respuesta sera un token que guardamos en la siguiente funcion
            this.guardarToken(res.datosUsuario.accessToken, res.datosUsuario.expiresIn);
          }
        })
      );
  }

  // Funcion que nos guardara el token en el localStorage del navegador
  private guardarToken(token: string, expiresIn: string): void {
    localStorage.setItem('TokenDeAcceso', token);
    localStorage.setItem('ExpiracionToken', expiresIn);
    this.token = token;
  }

   // Funcion que nos devolvera el token guardado en localStorage del navegador
  private solicitarToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('TokenDeAcceso');
    }
    return this.token;
  }

  // Funcion que nos eliminara el token del localStorage del navegador
  borrarToken(): void {
    this.token = '';
    localStorage.removeItem('TokenDeAcceso');
    localStorage.removeItem('ExpiracionToken');
  }

}
