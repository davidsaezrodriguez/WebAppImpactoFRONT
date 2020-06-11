import { LocalService } from '../../servicios/localService';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { Usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import { ConfiguracionBuscador } from '../adicionales/buscador/buscador.component';
import { ToastrService } from 'ngx-toastr';

// tslint:disable: member-ordering
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  //#endregion
  constructor(
    private usuariosService: UsuariosService, // Servicio para interactuar con API
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
  ) { }

  //#region VARIABLES

  // Array donde almacenamos las tablas que nos devuelve la api para el usuario seleccionado o logeado
  usuarios: Usuario[] = [];

  // Nivel de acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();

  //#region COMPONENTES

  ngOnInit(): void {
    if (this.acceso !== '1') {
      this.toastr.error('Falta de permisos para esta accion');
      this.router.navigate(['/menu']);
    }
    this.usuariosService.usuariosRegistrados().subscribe(data => (
      this.configBuscador.values = data.usuarios,
      this.usuarios = data.usuarios
    ));
  }

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

  // Funcion utilizada pada cuando se selecciona usuario del autocomplete
  selectUsuario($event) {
    if ($event != null) {
      // Si seleccionamos uno cargamos el array de usuarios solo con ese para mostrar su tarjeta
      this.usuarios = [this.usuarios.find(x => x._id === $event._id)];
    } else {
      // Si no se selecciona se recargan los usuarios
      this.usuariosService.usuariosRegistrados().subscribe(data => (
        this.usuarios = data.usuarios
      ));

    }
  }

  // Recargamos usuarios siempre que se vaya a usar el buscador
  refrescarUsuarios() {
    this.usuariosService.usuariosRegistrados().subscribe(data => (
      this.usuarios = data.usuarios
    ));
  }
  //#endregion
}
