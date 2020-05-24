import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // VARIABLES
  public nivelAcceso = this.autentificacionService.getAccesoUsuario();

  // FUNCIONES
  constructor(
    private autentificacionService: AutentificacionService,
  ) { }


  ngOnInit(): void {
  }
}
