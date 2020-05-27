import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Tabla, Tablas } from 'src/app/modelos/tabla';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';

@Component({
  selector: 'app-visualizar-tablas',
  templateUrl: './visualizar-tablas.component.html',
  styleUrls: ['./visualizar-tablas.component.scss']
})
export class VisualizarTablasComponent implements OnInit {

  //#region VARIABLES

  // id de la tabla seleccionada en el menu de tablas
  public idTabla;

  // tabla correspondiente al idTabla que nos devuelve la API
  public tabla: Tabla[] = [];
  public tablaBuena;
  //#endregion
  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor ID que nos manda el componente tablas
    private autentificacionService: AutentificacionService, // Servicio para interactuar con API
  ) { }

  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla 
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idTabla = params.idTabla;
      }
    );

    this.autentificacionService.buscarTabla(this.idTabla).subscribe(data => (
      console.log(data),
      this.tablaBuena = data.tablas,
      console.log(this.tabla)
    ));
  }

}
