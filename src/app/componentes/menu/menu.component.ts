import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //#region VARIABLES

  public nivelAcceso = this.localService.getAccesoUsuario();

  //#endregion

  constructor(
    private localService: LocalService, // Servicio para recuperar datos del localstorage

  ) { }


  ngOnInit(): void {
  }
}
