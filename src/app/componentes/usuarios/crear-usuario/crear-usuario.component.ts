import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { FormBuilder, Form, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { SeguimientosService } from 'src/app/servicios/seguimientosService';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  //#region VARIABLES

  // Formulario del componente
  formNuevoUsuario: FormGroup;

  // Variable donde guardaremos al nuevo usuario
  nuevoUsuario: Usuario;

  //#endregion
  constructor(
    private localService: LocalService, // Servicio para comprobar acceso
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    private usuariosService: UsuariosService, // Servicio para crear el usuario
    private seguimientosService: SeguimientosService // Servicio para interactuar con api seguimiento
  ) { }

  ngOnInit(): void {
    // En este componente solo puede entrar un administrador, comprobamos y si no lo es lo echamos
    const acceso = this.localService.getAccesoUsuario();
    if (acceso !== '1') {
      this.toastr.error('Falta de permisos para esta accion');
      this.router.navigate(['/menu']);
    }
    this.setformNuevoUsuario();
  }


  //#region FUNCIONES
  private setformNuevoUsuario() {
    this.formNuevoUsuario = this.formBuilder.group({
      dniUsuario: new FormControl(null, Validators.required),
      nombreUsuario: new FormControl(null, Validators.required),
      accesoUsuario: new FormControl(null, Validators.required),
      domicilioUsuario: new FormControl(null),
      telefonoUsuario: new FormControl(null),
    });
  }

  crearUsuario() {
    this.nuevoUsuario = ({
      dni: this.formNuevoUsuario.controls.dniUsuario.value,
      nombre: this.formNuevoUsuario.controls.nombreUsuario.value,
      password: '123456',
      acceso: this.formNuevoUsuario.controls.accesoUsuario.value,
      domicilio: this.formNuevoUsuario.controls.domicilioUsuario.value,
      telefono: this.formNuevoUsuario.controls.telefonoUsuario.value,
    });

    // Mandamos tabla con api a la bbdd
    this.usuariosService.registrarUsuario(this.nuevoUsuario).subscribe(res => {
      // Creamos seguimiento por si tiene o algun dia llegara a tener seguimientos
      this.seguimientosService.crearSeguimiento(res._id).subscribe();
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Usuario creado correctamente correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/usuarios']);
    }, err => {
      // Si da error lo mostramos
      if (err && err.status === 409) {
        this.toastr.error('DNI ya registrado');

      } else {
        this.toastr.error('Error en el servidor');
      }
    });
  }

  nivelAcceso() {
    const acceso = this.formNuevoUsuario.controls.accesoUsuario.value;
    if (acceso === '1') {
      return 'Administrador';
    }
    if (acceso === '2') {
      return 'Ejercicio';
    }
    if (acceso === '3') {
      return 'Nutricion';
    }
    if (acceso === '4') {
      return 'Clases';
    }
    if (acceso === '5') {
      return 'Ejercicio + Nutricion';
    }
    if (acceso === '6') {
      return 'Ejercicio + Clases';
    }
    if (acceso === '7') {
      return 'Nutricion + Clases';
    }
    if (acceso === '8') {
      return 'Ejercicio + Nutricion + Clases';
    }
  }
  //#endregion
}
