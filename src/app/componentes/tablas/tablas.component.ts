import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { ConfiguracionBuscador } from '../adicionales/buscador/buscador.component';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario';

// tslint:disable: member-ordering
@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements OnInit {

  //#region VARIABLES



  //#endregion

  constructor(
    private autentificacionService: AutentificacionService,
  ) { }

  ngOnInit(): void {
    // Cargamos los nombres de usuarios de BD en el componente de buscador
    this.autentificacionService.usuariosRegistrados().subscribe(data =>
      (
        this.configBuscador.values = data.usuarios
      ));
  }

  //#region COMPONENTES

  // Buscador de usuarios
  public configBuscador: ConfiguracionBuscador = {
    values: [],
    selected: null,
    filter: 'nombre',
    placeholder: 'Seleccione un Usuario',
    empty: 'No hay usuarios con ese nombre',
    fontSize: '14px',
    fontColor: '#000000',
    render: (value) => value.nombre
    // render: (value: Proyecto) => value.nombre
  };
  selectUsuario($event) {
    if ($event != null) {
      // this.formViaje.controls.proyecto.setValue(event);
      console.log($event._id);
    }
  }

  //#endregion
}
