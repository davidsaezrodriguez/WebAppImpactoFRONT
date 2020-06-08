import { Component, OnInit, NgZone } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { ConfiguracionBuscador } from '../adicionales/buscador/buscador.component';
import { LocalService } from 'src/app/servicios/localService';
import { Dieta } from 'src/app/modelos/dieta';
import { DietasService } from 'src/app/servicios/dietasService';

// tslint:disable: member-ordering

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.scss']
})
export class DietasComponent implements OnInit {

  //#region VARIABLES

  // Array donde almacenamos las tablas que nos devuelve la api para el usuario seleccionado o logeado
  dietasUsuario: Dieta[] = [];

  // Nivel de acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();

  // Id de usuario logeado
  idUsuario = null;

  //#endregion

  constructor(
    private usuariosService: UsuariosService, // Servicio para interactuar con API
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private dietasService: DietasService // Servicio para interactuar con API con DIETAS
  ) {
  }

  ngOnInit(): void {
    // Si accceso es 1 seria admin por lo que usaria el buscador para cargar tablas de usuario
    // si es otro nivel es un usuario, cargamos sus tablas
    if (this.acceso !== '1') {
      this.idUsuario = this.localService.getIdUsuario();
      this.cargarDietasUsuario(this.idUsuario);
    } else {
      // Cargamos los nombres de usuarios de BD en el componente de buscador
      this.usuariosService.usuariosNivelAcceso([3, 5, 7, 8]).subscribe(data => (
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

  // Funcion utilizada pada cuando se selecciona usuario del autocomplete en la version admin
  selectUsuario($event) {
    if ($event != null) {
      this.idUsuario = $event._id;
      this.cargarDietasUsuario(this.idUsuario);
    } else {
      this.dietasUsuario = []; // Si selecciona fuera vaciamos las dietas por si se cargaron antes
      this.idUsuario = null; // Tambien vaciamos el usuario ya que no habria ninguno seleccionado
    }
  }

  // Buscamos con api las dietas del usuario seleccionado y las cargamos
  cargarDietasUsuario(idUsuario) {
    this.dietasService.listarDietasUsuario(idUsuario).subscribe(data => {
      this.dietasUsuario = data.dietas;
    });
  }
  //#endregion

}
