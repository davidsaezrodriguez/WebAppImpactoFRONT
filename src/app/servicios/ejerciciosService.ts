import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tabla, Tablas, CambiosPeso } from '../modelos/tabla';
import { EjercicioEjemplo } from '../modelos/ejercicioEjemplo';

@Injectable()
export class EjerciciosService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';

  localFrontApi = 'http://localhost:4200';
  herokuFrontApi = 'https://webappimpactofront.herokuapp.com/';


  ServidorBACKEND = this.heroku;
  ServidorGuardarEjer = this.herokuFrontApi;

  authSubject = new BehaviorSubject(false);


  constructor(
    private httpClient: HttpClient
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion guardar ejercicio
  crearEjercicio(ejercicio: EjercicioEjemplo, imagen): Observable<any> {
    this.guardarImagen(imagen).subscribe(res => {
      console.log('Imagen guardada');
    });
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearEjercicio`, { ejercicio });
  }

  // Buscamos las tablas del usuario que mandamos a la api
  listarEjerciciosZona(zona): Observable<EjercicioEjemplo[]> {
    return this.httpClient.post<EjercicioEjemplo[]>(`${this.ServidorBACKEND}/listarEjerciciosZona`, { zona });
  }

  // Buscamos la tabla con la api en la base de datos
  buscarEjercicio(idEjercicio): Observable<EjercicioEjemplo> {
    return this.httpClient.post<EjercicioEjemplo>(`${this.ServidorBACKEND}/buscarEjercicio`, { idEjercicio });
  }

  // Guardar imagen
  guardarImagen(imagen) {
    return this.httpClient.post(`${this.ServidorGuardarEjer}/guardarImagen`, imagen);
  }

  // Eliminar ejercicio
  eliminarEjercicio(idEjercicio) {
    return this.httpClient.post(`${this.ServidorBACKEND}/eliminarEjercicio`, { idEjercicio });
  }

  //#endregion



}
