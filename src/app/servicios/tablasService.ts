import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tabla, Tablas } from '../modelos/tabla';
import { LocalService } from './localService';
import { AutentificacionService } from './autentificacionService';

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
    private httpClient: HttpClient,
    private autentificacionService: AutentificacionService, // Servicio para interactuar con API autentificacion
    private localService: LocalService, // Servicio para recuperar datos del localstorage
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion para guardar en base de datos nueva tabla
  crearTabla(tabla: Tabla) {
    // Creamos una variable con la tabla para crear un padre al json de la tabla llamado "tabla" y poder buscar mejor con la api
    const nuevaTabla = ({
      tabla
    });
    return this.httpClient.post(`${this.ServidorBACKEND}/crearTabla`, nuevaTabla).subscribe(data => {
      console.log(data);
    });
  }

  // Buscamos los usuarios registrados en la base de datos y devolvemos nombre y id
  public listarTablasUsuario(idUsuario): Observable<Tablas> {
    return this.httpClient.post<Tablas>(`${this.ServidorBACKEND}/listarTablasUsuario`, { idUsuario });
  }

  // Buscamos la tabla con la api en la base de datos
  public buscarTabla(idTabla): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/buscarTabla`, { idTabla });
  }

  //#endregion



}
