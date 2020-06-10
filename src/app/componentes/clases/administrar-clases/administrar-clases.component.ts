import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/servicios/localService';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/app/modelos/clase';
import { ClasesService } from 'src/app/servicios/clasesService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-administrar-clases',
  templateUrl: './administrar-clases.component.html',
  styleUrls: ['./administrar-clases.component.scss']
})
export class AdministrarClasesComponent implements OnInit {



  constructor(
    private localService: LocalService, // Servicio para comprobar acceso de persona logeada
    private formBuilder: FormBuilder,
    private router: Router,
    private clasesService: ClasesService, // Servicio para gestionar clases con api
    private toastr: ToastrService, // Servicio que nos creara notificaciones
  ) { }


  //#region VARIABLES

  // Formulario
  formNuevaClase: FormGroup;

  // Variable donde guardaremos nueva clase que creamos
  nuevaClase: Clase;

  // Array donde guardamos clases de listado
  clases: Clase[] = [];
  // Pipe para transformar fecha
  pipe = new DatePipe('es-ES'); // Use your own locale

  //#endregion

  ngOnInit(): void {
    const acceso = this.localService.getAccesoUsuario();
    if (acceso !== '1') {
      this.router.navigate(['/clases']);
    }
    this.setformNuevaClase();
    this.clasesService.listarClases().subscribe(data => {
      const clases = data;
      // Formateamos todas las fechas ya que nos las devuelve en formato Date y se verian mal en la tabla
      for (const clase of clases) {
        clase.inicio = this.pipe.transform(clase.inicio, 'dd/MM/yy HH:mm');
      }
      for (const clase of clases) {
        clase.fin = this.pipe.transform(clase.fin, 'dd/MM/yy HH:mm');
      }
      this.clases = clases;
      this.clases = data;
    })
  }

  //#region FUNCIONES

  private setformNuevaClase() {
    this.formNuevaClase = this.formBuilder.group({
      tipo: new FormControl(null, Validators.required),
      dia: new FormControl(null, Validators.required),
      inicio: new FormControl(null, Validators.required),
      fin: new FormControl(null, Validators.required),
      maxAlumnos: new FormControl(null, Validators.required),
    });
  }
  cargarColor(tipo) {
    if (tipo === 'Body Impacto') {
      return { primary: '#ad2121', secondary: '#ad2121' };
    }
    if (tipo === 'Zumba') {
      return { primary: '#5E8700', secondary: '#ad2121' };
    }
    if (tipo === 'Pilates') {
      return { primary: '#30FF62', secondary: '#ad2121' };
    }
    if (tipo === 'Flamenco') {
      return { primary: '#30B1FF', secondary: '#ad2121' };
    }
    if (tipo === 'Rumba') {
      return { primary: '#E9FF30', secondary: '#ad2121' };
    }
    if (tipo === 'Hipopresivos') {
      return { primary: '#AA30FF', secondary: '#ad2121' };
    }
    if (tipo === 'Cycle') {
      return { primary: '#FF8230', secondary: '#ad2121' };
    }
    if (tipo === 'GAP') {
      return { primary: '#FF30DC', secondary: '#ad2121' };
    }
  }
  crearClase() {
    // Cogemos fecha y hras de string y la pasamos a variables number para crear luego un date
    const fecha = (this.formNuevaClase.controls.dia.value)
    const hinicio = (this.formNuevaClase.controls.inicio.value)
    const hfin = (this.formNuevaClase.controls.fin.value)

    const inicio = new Date(fecha.year, fecha.month - 1, fecha.day, hinicio.hour, hinicio.minute);
    const fin = new Date(fecha.year, fecha.month - 1, fecha.day, hfin.hour, hfin.minute);

    const tipo = this.formNuevaClase.controls.tipo.value;
    const color = this.cargarColor(tipo);

    this.nuevaClase = ({
      tipo,
      inicio,
      fin,
      color,
      maxAlumnos: this.formNuevaClase.controls.maxAlumnos.value,
    });
    //  Mandamos tabla con api a la bbdd
    this.clasesService.crearClase(this.nuevaClase).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a clases
      this.toastr.success('', 'Clase creada correctamente', {
        timeOut: 3000,
      });
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al crear clase');
    });
  }

  // Funcion para borrar clase
  borrarClase(idClase) {
    //  Mandamos tabla con api a la bbdd
    this.clasesService.eliminarClase(idClase).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a clases
      this.toastr.success('', 'Clase eliminada correctamente', {
        timeOut: 3000,
      });
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al eliminar clase');
    });
  }
}
