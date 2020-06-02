import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { JsonWebToken } from '../modelos/jsonWebToken';
import { Router } from '@angular/router';

@Injectable()
export class LocalService {

    // Variable para descifrar token
    jwtHelper: JwtHelperService = new JwtHelperService();

    // Creamos token
    private token: string;

    constructor(
        private router: Router,
    ) {

    }

    //#region FUNCIONES

    // Funcion que nos eliminara el token del localStorage del navegador
    cerrarSesion(): void {
        this.token = '';
        localStorage.removeItem('TokenDeAcceso');
        localStorage.removeItem('ExpiracionToken');
        this.router.navigate(['/']);
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

    // Devolvemos acceso del usuario
    public getAccesoUsuario(): string {
        const token = this.getTokenData();
        return token.acceso;
    }
    // Devolvemos acceso del usuario
    public getIdUsuario(): string {
        const token = this.getTokenData();
        return token.id;
    }

    //#endregion

}
