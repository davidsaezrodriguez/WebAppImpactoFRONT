import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { ConfiguracionBuscador } from '../adicionales/buscador/buscador.component';
import { LocalService } from 'src/app/servicios/localService';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Seguimiento } from 'src/app/modelos/seguimiento';
import { SeguimientosService } from 'src/app/servicios/seguimientosService';
import { DatePipe } from '@angular/common';

// tslint:disable: member-ordering

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

  //#region VARIABLES

  // Almacenamos el seguimiento del usuario seleccionado o logeado
  seguimiento: Seguimiento;

  // Seguimiento nuevo que se usara en el formulario
  seguimientoNuevo: Seguimiento;

  // Nivel de acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();

  // Id de usuario logeado
  idUsuario = null;

  // Formulario añadir indice y medidas nuevo
  formNuevoIndice: FormGroup;
  formNuevaMedidas: FormGroup;

  // Pipe para transformar fecha
  pipe = new DatePipe('es-ES'); // Use your own locale

  //#endregion
  constructor(
    private usuariosService: UsuariosService, // Servicio para interactuar con API
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private formBuilder: FormBuilder,
    private router: Router,
    private seguimientosService: SeguimientosService, // Servicio para interactuar con api seguimiento
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) { }

  ngOnInit(): void {
    // Si accceso es 1 seria admin por lo que usaria el buscador para cargar tablas de usuario
    // si es otro nivel es un usuario, cargamos sus tablas
    if (this.acceso !== '1') {
      this.idUsuario = this.localService.getIdUsuario();
      this.cargarSeguimientoUsuario(this.idUsuario);
    } else {
      // Cargamos los nombres de usuarios de BD en el componente de buscador
      this.usuariosService.usuariosNivelAcceso([3, 5, 7, 8]).subscribe(data => (
        this.configBuscador.values = data.usuarios
      ));
    }
    this.setForm();
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

  // Funcion utilizada pada cuando se selecciona usuario del autocomplete en la version admin
  selectUsuario($event) {
    if ($event != null) {
      this.idUsuario = $event._id;
      this.cargarSeguimientoUsuario(this.idUsuario);
    } else {
      this.seguimiento = null; // Si selecciona fuera vaciamos las tablas por si se cargaron antes
      this.idUsuario = null; // Tambien vaciamos el usuario ya que no habria ninguno seleccionado
    }
  }
  // Buscamos con api las tablas del usuario seleccionado y las cargamos
  cargarSeguimientoUsuario(idUsuario) {
    this.seguimientosService.buscarSeguimiento(idUsuario).subscribe(data => {
      const seguimiento = data[0];
      // Formateamos todas las fechas ya que nos las devuelve en formato Date y se verian mal en la tabla
      for (const indice of seguimiento.indice) {
        indice.fecha = this.pipe.transform(indice.fecha, 'dd/MM/yyyy');
      }
      for (const medida of seguimiento.medida) {
        medida.fecha = this.pipe.transform(medida.fecha, 'dd/MM/yyyy');
      }
      this.seguimiento = seguimiento;
    });
  }
  private setForm() {
    const now = Date.now();
    const fechaHoy = this.pipe.transform(now, 'dd/MM/yyyy');
    this.formNuevoIndice = this.formBuilder.group({
      fechaIndice: new FormControl(fechaHoy, Validators.required),
      peso: new FormControl(null, Validators.required),
      altura: new FormControl(null, Validators.required),
      imc: new FormControl(null, Validators.required),
      grasa: new FormControl(null),
    });
    this.formNuevaMedidas = this.formBuilder.group({
      fechaMedidas: new FormControl(fechaHoy, Validators.required),
      biceps: new FormControl(null, Validators.required),
      hombros: new FormControl(null, Validators.required),
      pecho: new FormControl(null, Validators.required),
      cintura: new FormControl(null, Validators.required),
      gluteo: new FormControl(null, Validators.required),
      muslo: new FormControl(null, Validators.required),
    });
  }

  calculoIMC() {
    const peso = this.formNuevoIndice.controls.peso.value;
    const altura = this.formNuevoIndice.controls.altura.value;
    if (peso != null && altura != null) {
      // tslint:disable-next-line: no-bitwise
      const IMC = (peso / ((altura / 100) ^ 2)).toFixed(2);
      this.formNuevoIndice.controls.imc.setValue(IMC);
    }
  }
  guardarIndice() {
    // Cogemos valor de fecha y lo pasamos a un date que nos guarde bien en BBDD
    const fecha = (this.formNuevoIndice.controls.fechaIndice.value).split('/');
    const diaIndice: number = fecha[0];
    const mesIndice: number = fecha[1];
    const anoIndice: number = fecha[2];
    const fechaIndice = new Date(anoIndice, mesIndice - 1, diaIndice);

    // Creamos seguimiento para enviarlo a api y añadir indice
    this.seguimientoNuevo = ({
      usuario: this.idUsuario,
      indice: [{
        fecha: fechaIndice,
        peso: this.formNuevoIndice.controls.peso.value,
        altura: this.formNuevoIndice.controls.altura.value,
        imc: this.formNuevoIndice.controls.imc.value,
        grasa: this.formNuevoIndice.controls.grasa.value,
      }]
    });

    // Guardamos en BBDD con API
    this.seguimientosService.guardarIndice(this.seguimientoNuevo).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Indice guardado correctamente', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos añadidos y vaciar campos
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al guardar indice');
    });
  }
  guardarMedidas() {
    // Cogemos valor de fecha y lo pasamos a un date que nos guarde bien en BBDD
    const fecha = (this.formNuevaMedidas.controls.fechaMedidas.value).split('/');
    const diaMedida: number = fecha[0];
    const mesMedida: number = fecha[1];
    const anoMedida: number = fecha[2];
    const fechaMedida = new Date(anoMedida, mesMedida - 1, diaMedida);

    // Creamos seguimiento para enviarlo a api y añadir medida
    this.seguimientoNuevo = ({
      usuario: this.idUsuario,
      medida: [{
        fecha: fechaMedida,
        biceps: this.formNuevaMedidas.controls.biceps.value,
        hombros: this.formNuevaMedidas.controls.hombros.value,
        pecho: this.formNuevaMedidas.controls.pecho.value,
        cintura: this.formNuevaMedidas.controls.cintura.value,
        gluteo: this.formNuevaMedidas.controls.gluteo.value,
        muslo: this.formNuevaMedidas.controls.muslo.value,
      }]
    });

    // Guardamos en BBDD con API
    this.seguimientosService.guardarMedidas(this.seguimientoNuevo).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Medidas guardadas correctamente', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos añadidos y vaciar campos
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al guardar medidas');
    });
  }


  eliminarIndice(idIndice) {
    this.seguimientosService.eliminarIndice(this.seguimiento._id, idIndice).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Indice eliminado correctamente', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos actualizados y vaciar campos
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al borrar indice');
    });
  }

  eliminarMedida(idMedida) {
    this.seguimientosService.eliminarMedidas(this.seguimiento._id, idMedida).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Medida eliminada correctamente', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos actualizados y vaciar campos
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al borrar medida');
    });
  }
  //#endregion
}
