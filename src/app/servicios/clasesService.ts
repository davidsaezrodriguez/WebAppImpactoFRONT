import { Clase } from '../modelos/clase';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation, } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class ClasesService {

  // Direccones de servidor de back
  local = 'http://localhost:3000';
  heroku = 'https://webappimpactoback.herokuapp.com';


  ServidorBACKEND = this.heroku;

  authSubject = new BehaviorSubject(false);


  constructor(
    private httpClient: HttpClient
  ) {

  }

  //#region FUNCIONES INTERACTUAR CON API

  // Funcion guardar ejercicio
  crearClase(clase: Clase): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearClase`, { clase });
  }

  // Buscamos todas las clases
  listarClases(): Observable<Clase[]> {
    return this.httpClient.post<Clase[]>(`${this.ServidorBACKEND}/listarClases`, '');
  }
  // Eliminar ejercicio
  eliminarClase(idClase) {
    return this.httpClient.post(`${this.ServidorBACKEND}/eliminarClase`, { idClase });
  }

  // Añadir alumno a clase
  anadirAlumnoClase(idClase, usuario) {
    return this.httpClient.post(`${this.ServidorBACKEND}/anadirAlumnoClase`, { idClase, usuario });
  }
  // Añadir alumno a clase
  eliminarAlumnoClase(idClase, usuario) {
    return this.httpClient.post(`${this.ServidorBACKEND}/eliminarAlumnoClase`, { idClase, usuario });
  }

  // Listar clases a las que asiste el alumno
  listarClasesAsiste(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/listarClasesAsiste`, { usuario });
  }

  // Listar clases a las que NO asiste el alumno
  listarClasesNoAsiste(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.ServidorBACKEND}/listarClasesNoAsiste`, { usuario });
  }

  //#endregion

}
