import { Component, OnInit, NgZone } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { ConfiguracionBuscador } from '../adicionales/buscador/buscador.component';
import { Tabla } from 'src/app/modelos/tabla';
import { LocalService } from 'src/app/servicios/localService';
import { TablasService } from 'src/app/servicios/tablasService';

// tslint:disable: member-ordering
@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements OnInit {

  //#region VARIABLES

  // Array donde almacenamos las tablas que nos devuelve la api para el usuario seleccionado o logeado
  tablasUsuario: Tabla[] = [];

  // Nivel de acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();

  // Id de usuario logeado
  idUsuario = null;

  //#endregion

  constructor(
    private autentificacionService: AutentificacionService, // Servicio para interactuar con API
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private tablasService: TablasService // Servicio para interactuar con API con TABLAS
  ) {
  }

  ngOnInit(): void {
    // Si accceso es 1 seria admin por lo que usaria el buscador para cargar tablas de usuario
    // si es otro nivel es un usuario, cargamos sus tablas
    if (this.acceso !== '1') {
      this.idUsuario = this.localService.getIdUsuario();
      this.cargarTablasUsuario(this.idUsuario);
    } else {
      // Cargamos los nombres de usuarios de BD en el componente de buscador
      this.autentificacionService.usuariosNivelAcceso([2, 5, 6, 7]).subscribe(data => (
        this.configBuscador.values = data.usuarios
      ));
    }
  }

  //#region COMPONENTES

  // Buscador de usuarios
  configBuscador: ConfiguracionBuscador = {
    values: [],
    selected: null,
    filter: 'nombre',
    placeholder: 'Seleccione un Usuario',
    empty: 'No hay usuarios con ese nombre',
    fontSize: '14px',
    fontColor: '#000000',
    render: (value) => value.nombre
  };

  selectUsuario($event) {
    if ($event != null) {
      this.idUsuario = $event._id;
      this.cargarTablasUsuario(this.idUsuario);
    } else {
      this.tablasUsuario = []; // Si selecciona fuera vaciamos las tablas por si se cargaron antes
      this.idUsuario = null; // Tambien vaciamos el usuario ya que no habria ninguno seleccionado
    }
  }
  // Buscamos con api las tablas del usuario seleccionado y las cargamos
  cargarTablasUsuario(idUsuario) {
    this.tablasService.listarTablasUsuario(idUsuario).subscribe(data => {
      this.tablasUsuario = data.tablas;
    });
  }
  //#endregion
}
