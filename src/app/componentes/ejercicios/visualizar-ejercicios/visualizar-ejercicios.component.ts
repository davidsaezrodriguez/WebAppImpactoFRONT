import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from 'src/app/servicios/ejerciciosService';
import { ActivatedRoute, Params } from '@angular/router';
import { EjercicioEjemplo } from 'src/app/modelos/ejercicioEjemplo';

@Component({
  selector: 'app-visualizar-ejercicios',
  templateUrl: './visualizar-ejercicios.component.html',
  styleUrls: ['./visualizar-ejercicios.component.scss']
})
export class VisualizarEjerciciosComponent implements OnInit {

  //#region 

  // Variable de la zona que corresponden ejercicios, recogida de url
  zona;

  // Array donde almacenamos ejercicios de la zona correspondiente
  ejerciciosZona: EjercicioEjemplo[] = [];

  //#endregion


  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor zona que nos manda el componente ejercicios
    private ejerciciosService: EjerciciosService, // Servicio para gestionar ejercicios con api
  ) { }

  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.zona = params.zona;
      }
    );
    this.ejerciciosService.listarEjerciciosZona(this.zona).subscribe(data => {
      this.ejerciciosZona = data;
    });
  }

  //#region FUNCIONES




  //#endregion


}
