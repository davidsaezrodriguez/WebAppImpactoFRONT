import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tabla, Tablas, CambiosPeso } from '../modelos/tabla';

@Injectable()
export class TablasService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  ServidorBACKEND = this.heroku;
  authSubject = new BehaviorSubject(false);

  // Creamos token
  private token: string;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion para guardar en base de datos nueva tabla
  crearTabla(tabla: Tabla): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearTabla`, { tabla });
  }

  // Buscamos las tablas del usuario que mandamos a la api
  public listarTablasUsuario(idUsuario): Observable<Tablas> {
    return this.httpClient.post<Tablas>(`${this.ServidorBACKEND}/listarTablasUsuario`, { idUsuario });
  }

  // Buscamos la tabla con la api en la base de datos
  public buscarTabla(idTabla): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/buscarTabla`, { idTabla });
  }

  // Actualizamos pesosMax de tabla
  public actualizarPesoMax(cambiosPesoMax: Array<CambiosPeso>) {
    return this.httpClient.post(`${this.ServidorBACKEND}/actualizarPeso`, cambiosPesoMax);
  }

  //#endregion



}
