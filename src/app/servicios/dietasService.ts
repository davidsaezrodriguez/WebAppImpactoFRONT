import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Dieta, Dietas } from '../modelos/dieta';

@Injectable()
export class DietasService {

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

    // Funcion para guardar en base de datos nueva dieta
    crearDieta(dieta: Dieta): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/crearDieta`, { dieta });
    }

    // Buscamos las dietas del usuario que mandamos a la api
    listarDietasUsuario(idUsuario): Observable<Dietas> {
        return this.httpClient.post<Dietas>(`${this.ServidorBACKEND}/listarDietasUsuario`, { idUsuario });
    }

    // Buscamos la dieta con la api en la base de datos
    buscarDieta(idDieta): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/buscarDieta`, { idDieta });
    }

    // Mandamois ID de la dieta para borrarla en la bdd con api
    eliminarDieta(idDieta): Observable<any> {
        return this.httpClient.post<any>(`${this.ServidorBACKEND}/eliminarDieta`, { idDieta });
    }

    //#endregion



}
