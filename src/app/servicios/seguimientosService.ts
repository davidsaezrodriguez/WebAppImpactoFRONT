import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tabla, Tablas, CambiosPeso } from '../modelos/tabla';
import { Seguimiento } from '../modelos/seguimiento';

@Injectable()
export class SeguimientosService {

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

    // Funcion para guardar en base de datos nueva tabla
    crearSeguimiento(idUsuario): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearSeguimiento`, { idUsuario });
    }

    // Funcion para guardar en base de datos nueva tabla
    buscarSeguimiento(idUsuario): Observable<Seguimiento> {
        return this.httpClient.post<Seguimiento>(`${this.ServidorBACKEND}/buscarSeguimiento`, { idUsuario });
    }

    // Buscamos la tabla con la api en la base de datos
    guardarIndice(seguimiento: Seguimiento): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/guardarIndice`, { seguimiento });
    }

    // Actualizamos pesosMax de tabla
    guardarMedidas(seguimiento: Seguimiento) {
        return this.httpClient.post(`${this.ServidorBACKEND}/guardarMedidas`, { seguimiento });
    }

    // Mandamois ID de la tabla para borrarla en la bdd con api
    eliminarIndice(idSeguimiento, idIndice): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/eliminarIndice`, { idSeguimiento, idIndice });
    }

    // Mandamois ID de la tabla para borrarla en la bdd con api
    eliminarMedidas(idSeguimiento, idMedida): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/eliminarMedidas`, { idSeguimiento, idMedida });
    }


    //#endregion



}
