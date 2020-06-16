
import { Component, OnInit } from '@angular/core';
import { EjercicioEjemplo } from 'src/app/modelos/ejercicioEjemplo';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EjerciciosService } from 'src/app/servicios/ejerciciosService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalService } from 'src/app/servicios/localService';
import { ToastrService } from 'ngx-toastr';
import { MensajeConfirmarService } from 'src/app/servicios/mensajeConfirmarService';


@Component({
  selector: 'app-detalles-ejercicio',
  templateUrl: './detalles-ejercicio.component.html',
  styleUrls: ['./detalles-ejercicio.component.scss']
})
export class DetallesEjercicioComponent implements OnInit {

  //#region VARIABLES

  // Variable donde guardamos idEjercicio que nos mandamos por url
  idEjercicio;

  // Objeto ejercicio donde guardamos ejercicio a mostrar que nos devolvera la api
  ejercicio: EjercicioEjemplo;

  // Comprobamos acceso para si es admin dejar borrar ejercicio
  acceso = this.localService.getAccesoUsuario();

  // Variable para verificar estar seguro de borrar o no
  checkActivado = false;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor zona que nos manda el componente ejercicios
    private ejerciciosService: EjerciciosService, // Servicio para gestionar ejercicios con api
    private localService: LocalService, // Servicio para comprobar con el token el nivel de acceso
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    // tslint:disable-next-line: variable-name
    private _sanitizer: DomSanitizer, // Utilizaremos este servicio para añadir video si el ejemplo lo tuviera
    private mensajeConfirmarService: MensajeConfirmarService // Servicio para confirmar eliminar

  ) { }

  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idEjercicio = params.idEjercicio;
      }
    );
    this.ejerciciosService.buscarEjercicio(this.idEjercicio).subscribe(data => {
      // Cogemos el unico valor que nos devuelven en data ya que al buscar 1 ejercicio por id solo hay uno
      this.ejercicio = data[0];

    });
  }

  //#region FUNCIONES

  getVideoIframe(url) {
    let video;
    let results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  checkEliminar() {
    if (!this.checkActivado) {
      this.checkActivado = true;
    } else {
      this.checkActivado = false;
    }
  }

  // Eliminar ejercicio
  eliminarEjercicio() {
    this.ejerciciosService.eliminarEjercicio(this.idEjercicio).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Ejercicio elimnado correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/ejercicios']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al borrar ejercicio');
    });
  }

   // Confirmar eliminacion con alert
   public confirmarEliminacion() {
    this.mensajeConfirmarService.confirm('Por favor confirme..', '¿Estas seguro de eliminar el ejercicio?')
      .then((confirmed) => { if (confirmed) { this.eliminarEjercicio(); } })
      .catch(() => console.log('No eliminar'));
  }
  //#endregion

}
