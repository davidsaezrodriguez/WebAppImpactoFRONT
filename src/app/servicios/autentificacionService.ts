import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { JwtResponseI } from '../modelos/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JsonWebToken } from '../modelos/jsonWebToken';


@Injectable()
export class AutentificacionService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  ServidorBACKEND = this.local || this.heroku;
  authSubject = new BehaviorSubject(false);

  // Variable para descifrar token
  jwtHelper: JwtHelperService = new JwtHelperService();

  // Creamos token
  private token: string;
  constructor(
    private httpClient: HttpClient
  ) {

  }

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

  // Funcion que nos guardara el token en el localStorage del navegador
  private guardarToken(id: string, token: string, expiresIn: string): void {
    localStorage.setItem('idUsuario', id);
    localStorage.setItem('TokenDeAcceso', token);
    localStorage.setItem('ExpiracionToken', expiresIn);
    this.token = token;
  }

  // Funcion que nos eliminara el token del localStorage del navegador
  borrarToken(): void {
    this.token = '';
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('TokenDeAcceso');
    localStorage.removeItem('ExpiracionToken');
  }

  // Comprobamos si el usuario esta autentificado si esta el token el el storage
  public comprobarAutentificacion(): boolean {
    // tslint:disable-next-line: semicolon
    return localStorage.getItem('TokenDeAcceso') !== null && localStorage.getItem('ExpiracionToken') !== null
  }

  // Nos devolvera el token guardado en localstorage
  public getToken(): string {
    return localStorage.getItem('TokenDeAcceso');
  }

  // Nos devolvera el id del usuario guardado en localstorage
  public getIdUsuario(): string {
    return localStorage.getItem('idUsuario');
  }

  // Nos devolvera la expiracion del token guardado en localstorage
  public getExpiracionToken(): string {
    return localStorage.getItem('ExpiracionToken');
  }

  // Desciframos los datos del token
  public getTokenData(): JsonWebToken {
    const t = this.getToken();
    if (t) {
      const token = this.jwtHelper.decodeToken(t);
      return {
        id: token.id,
        nombre: token.nombre,
        dni: token.dni,
        acceso: token.acceso
      };
    } else {
      return {} as JsonWebToken;
    }
  }

  // Comprobamos acceso del usuario
  public getAccesoUsuario(): string {
    const t = this.getToken();
    if (t) {
      const token = this.jwtHelper.decodeToken(t);
      return token.acceso;
    }
  }

}
