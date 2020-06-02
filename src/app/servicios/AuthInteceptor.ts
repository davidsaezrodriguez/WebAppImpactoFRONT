import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalService } from './localService';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Cogemos el token del usuario de localstorage
    const token = localStorage.getItem('TokenDeAcceso');

    if (!token) {
      return next.handle(req);
    }

    // Añadimos el token al header Authorization de todas las solicitudes http
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    // Mandamos siempre la peticion con el Authorization y si diera error 401 (Token no valido) cerramos sesion
    return next.handle(req1).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.localService.cerrarSesion();
          this.toastr.error('', 'Sesion caducada', {
            timeOut: 3000,
          });
        }

        return throwError(err);

      })
    );
  }
}
