import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements OnInit {

  constructor(
    private autentificacionService: AutentificacionService,
  ) { }

  datosUsuario = this.autentificacionService.getTokenData();
  ngOnInit(): void {
  }

}
