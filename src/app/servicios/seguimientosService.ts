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

    // Funcion para crear un seguimiento al usuario en bdd
    crearSeguimiento(idUsuario): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearSeguimiento`, { idUsuario });
    }

    // Funcion para buscar en bbdd el seguimiento del usuario
    buscarSeguimiento(idUsuario): Observable<Seguimiento> {
        return this.httpClient.post<Seguimiento>(`${this.ServidorBACKEND}/buscarSeguimiento`, { idUsuario });
    }

    // Guardamos nuevo indice del usuario en bbdd
    guardarIndice(seguimiento: Seguimiento): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/guardarIndice`, { seguimiento });
    }

    // Guardamos nueva medida del usuario en bbdd
    guardarMedidas(seguimiento: Seguimiento) {
        return this.httpClient.post(`${this.ServidorBACKEND}/guardarMedidas`, { seguimiento });
    }

    // Eliminamos un indice del usuario en bbdd
    eliminarIndice(idSeguimiento, idIndice): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/eliminarIndice`, { idSeguimiento, idIndice });
    }

    // Eliminamos una medida del usuario en bbdd
    eliminarMedidas(idSeguimiento, idMedida): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/eliminarMedidas`, { idSeguimiento, idMedida });
    }

    //#endregion



}
