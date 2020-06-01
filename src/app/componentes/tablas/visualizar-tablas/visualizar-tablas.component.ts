import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Tabla, Tablas } from 'src/app/modelos/tabla';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { TablasService } from 'src/app/servicios/tablasService';

@Component({
  selector: 'app-visualizar-tablas',
  templateUrl: './visualizar-tablas.component.html',
  styleUrls: ['./visualizar-tablas.component.scss']
})
export class VisualizarTablasComponent implements OnInit {

  //#region VARIABLES

  // id de la tabla seleccionada que nos mandamos desde el menu de tablas
  public idTabla;

  // tabla correspondiente al idTabla que nos devuelve la API
  public tablaRe;
  tabla: Tabla;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idTabla que nos manda el componente tablas
    private autentificacionService: AutentificacionService, // Servicio para interactuar con API
    private tablasService: TablasService // Servicio para interactuar con API con TABLAS
  ) { }

  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idTabla = params.idTabla;
      }
    );

    this.tablasService.buscarTabla(this.idTabla).subscribe(data => (
      // La api nos devuelve array de tablas por lo que cogemos el primero ya que solo hay 1
      this.tabla = ({
        _id: data.tabla[0]._id,
        usuario: data.tabla[0].usuario,
        nombre: data.tabla[0].nombre,
        dia: data.tabla[0].dia,
      }),
      console.log(this.tabla)
    ));
  }

}
