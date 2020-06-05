import { Component, OnInit } from '@angular/core';
import { EjercicioEjemplo } from 'src/app/modelos/ejercicioEjemplo';
import { ActivatedRoute, Params } from '@angular/router';
import { EjerciciosService } from 'src/app/servicios/ejerciciosService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor zona que nos manda el componente ejercicios
    private ejerciciosService: EjerciciosService, // Servicio para gestionar ejercicios con api
    private _sanitizer: DomSanitizer // Utilizaremos este servicio para añadir video si el ejemplo lo tuviera

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


  //#endregion

}
