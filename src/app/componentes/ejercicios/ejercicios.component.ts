import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss']
})
export class EjerciciosComponent implements OnInit {

  //#region VARIABLES

  // Array donde almacenamos las tablas que nos devuelve la api para el usuario seleccionado o logeado
  tablasUsuario: [] = [];

  // Nivel de acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();

  // Id de usuario logeado
  idUsuario = null;

  //#endregion

  constructor(
    private localService: LocalService, // Servicio para recuperar datos del localstorage
  ) { }

  ngOnInit(): void {
  }

}
