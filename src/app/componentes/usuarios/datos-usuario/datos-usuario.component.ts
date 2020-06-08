import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { Usuario } from 'src/app/modelos/usuario';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss']
})
export class DatosUsuarioComponent implements OnInit {


  //#region VARIABLES

  // idUsuario del que mostramos datos
  idUsuario;

  // Variable donde guardaremos el usuario
  usuario: Usuario;

  // Formulario del componente actualizar datos
  formActualizarDatosUsuario: FormGroup;

  // Formulario del componente cambiar contraseña
  formCambiarContrasena: FormGroup;

  // Actualizando datos
  actualizandoDatos = false;

  // Acceso usuario logeado
  usuarioLogeado = this.localService.getTokenData();

  // Variable true si hay cambios en formulario datos
  cambiosFormDatosComp = false;

  // Variable para verificar estar seguro de borrar o no
  checkActivado = false;

  //#endregion
  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idUsuario que nos manda el componente tablas
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    private usuariosService: UsuariosService, // Servicio para crear el usuario
    private localService: LocalService // Servicio para crear el usuario
  ) { }

  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idUsuario = params.idUsuario;
      }
    );
    this.usuariosService.buscarUsuario(this.idUsuario).subscribe(res => {
      this.usuario = res.usuario;
      this.datosDeUsuarioAlFormulario();
    });
    this.setformActualizarDatosUsuario();
    this.setformCambiarContrasena();
  }

  //#region FUNCIONES
  setformActualizarDatosUsuario() {
    this.formActualizarDatosUsuario = this.formBuilder.group({
      dniUsuario: new FormControl(null, Validators.required),
      nombreUsuario: new FormControl(null, Validators.required),
      accesoUsuario: new FormControl(null, Validators.required),
      domicilioUsuario: new FormControl(null),
      telefonoUsuario: new FormControl(null)
    });
  }
  datosDeUsuarioAlFormulario() {
    this.formActualizarDatosUsuario.controls.dniUsuario.setValue(this.usuario.dni);
    this.formActualizarDatosUsuario.controls.nombreUsuario.setValue(this.usuario.nombre);
    this.formActualizarDatosUsuario.controls.accesoUsuario.setValue(this.usuario.acceso);
    this.formActualizarDatosUsuario.controls.domicilioUsuario.setValue(this.usuario.domicilio);
    this.formActualizarDatosUsuario.controls.telefonoUsuario.setValue(this.usuario.telefono);

  }

  // Funcion al detectar cambios en el formulario
  cambiosFormDatos() {
    this.cambiosFormDatosComp = true;

  }
  setformCambiarContrasena() {
    this.formCambiarContrasena = this.formBuilder.group({
      passwordVieja: new FormControl(null, Validators.required),
      passwordNueva: new FormControl(null, Validators.required),
      passwordNuevaConfirmacion: new FormControl(null, Validators.required),
    });
  }
  modificarDatos() {
    const usuarioActualizado = ({
      id: this.usuario._id,
      dni: this.formActualizarDatosUsuario.controls.dniUsuario.value,
      nombre: this.formActualizarDatosUsuario.controls.nombreUsuario.value,
      acceso: this.formActualizarDatosUsuario.controls.accesoUsuario.value,
      domicilio: this.formActualizarDatosUsuario.controls.domicilioUsuario.value,
      telefono: this.formActualizarDatosUsuario.controls.telefonoUsuario.value,
    });

    // Mandamos usuario a la api para modificar sus datos
    this.usuariosService.modificarDatosUsuario(usuarioActualizado).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Usuario modificado correctamente', {
        timeOut: 3000,
      });
      this.cambiosFormDatosComp = false;
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al modificar datos');
    });
  }

  nivelAcceso() {
    const acceso = this.usuario.acceso;
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
  cambiarContrasena() {
    const contraVieja = this.formCambiarContrasena.controls.passwordVieja.value;
    const contraNueva = this.formCambiarContrasena.controls.passwordNueva.value;
    const contranNuevaConf = this.formCambiarContrasena.controls.passwordNuevaConfirmacion.value;
    const idUsuario = this.usuario._id;

    if (contraNueva === contranNuevaConf) {
      this.usuariosService.cambiarContraseña(contraVieja, contraNueva, idUsuario).subscribe(res => {
        // Si se crea correctamente mandamos mensaje y redirigimos a tablas
        this.toastr.success('', 'Contraseña cambiada con exito', {
          timeOut: 3000,
        });
        this.router.navigate(['/menu']);
      }, err => {
        // Si da error lo mostramos
        this.toastr.error('Contraseña incorrecta');
      });
    }
  }

  checkEliminar() {
    if (!this.checkActivado) {
      this.checkActivado = true;
    } else {
      this.checkActivado = false;

    }
  }
  eliminarUsuario() {
    this.usuariosService.eliminarUsuario(this.usuario._id).subscribe(res => {
      // Si se elimina corectamente
      this.toastr.success('', 'Usuario eliminado correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/usuarios']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al eliminar la usuario');
    });
  }

  //#endregion
}
