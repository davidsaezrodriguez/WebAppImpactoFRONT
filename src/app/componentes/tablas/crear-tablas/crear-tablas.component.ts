import { Component, OnInit } from '@angular/core';
import { Tabla, Ejercicio, Dia } from 'src/app/modelos/tabla';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TablasService } from 'src/app/servicios/tablasService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-tablas',
  templateUrl: './crear-tablas.component.html',
  styleUrls: ['./crear-tablas.component.scss']
})

export class CrearTablasComponent implements OnInit {

  //#region VARIABLES

  // Formulario
  formNuevaTabla: FormGroup;

  // idUsuario que nos mandamos desde tablas para crear la tabla al usuario
  idUsuario;

  // Arrays donde guardaremos los ejercicios de cada dia
  ejerciciosDia1: Array<Ejercicio> = [];
  ejerciciosDia2: Array<Ejercicio> = [];
  ejerciciosDia3: Array<Ejercicio> = [];
  ejerciciosDia4: Array<Ejercicio> = [];
  ejerciciosDia5: Array<Ejercicio> = [];

  // Array donde guardaremos los dias de la tabla con sus ejercicios
  dias: Array<Dia> = [];

  // Tabla que mandaremos con la api a la bbdd
  tabla: Tabla;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idUsuario que nos manda el componente tablas
    private tablasService: TablasService, // Servicio para interactuar con API con TABLAS
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) {
    this.setformNuevaTabla();
  }


  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idUsuario = params.idUsuario;
      }
    );
  }

  //#region FUNCIONES

  private setformNuevaTabla() {
    this.formNuevaTabla = this.formBuilder.group({
      nombreTabla: new FormControl(null, Validators.required),
      ejercicioDia1: new FormControl(null, Validators.required),
      repeticionesDia1: new FormControl(null, Validators.required),
      ejercicioDia2: new FormControl(null, Validators.required),
      repeticionesDia2: new FormControl(null, Validators.required),
      ejercicioDia3: new FormControl(null, Validators.required),
      repeticionesDia3: new FormControl(null, Validators.required),
      ejercicioDia4: new FormControl(null, Validators.required),
      repeticionesDia4: new FormControl(null, Validators.required),
      ejercicioDia5: new FormControl(null, Validators.required),
      repeticionesDia5: new FormControl(null, Validators.required),
    });
  }

  // Funcion que usamos para añadir los ejercicios a cada dia en su correspondiente array
  anadirEjercicio(dia, inputEjer, inputRep) {
    const ejercicio = ({
      nombre: this.formNuevaTabla.get(inputEjer).value,
      repeticiones: this.formNuevaTabla.get(inputRep).value,
      pesoMax: ''
    });
    dia.push(ejercicio);
    // Borramos inputs para añadir otro ejercicio
    this.formNuevaTabla.get(inputEjer).setValue(null);
    this.formNuevaTabla.get(inputRep).setValue(null);
  }

  // Funcion para borrar ejercicio del array si se quiere al dar al boton
  borrarEjercicio(dia, i) {
    dia.splice(i, 1);
  }

  // Funcion guardamos tabla y mandamos con servicio a la api para guardar en BBDD
  guardarTabla() {
    // Comporbamos si el dia tiene ejercicios y si es asi lo añadimos a los dias
    if (this.ejerciciosDia1.length > 0) {
      this.dias.push(({
        ejercicio: this.ejerciciosDia1
      }));
    }
    if (this.ejerciciosDia2.length > 0) {
      this.dias.push(({
        ejercicio: this.ejerciciosDia2
      }));
    }
    if (this.ejerciciosDia3.length > 0) {
      this.dias.push(({
        ejercicio: this.ejerciciosDia3
      }));
    }
    if (this.ejerciciosDia4.length > 0) {
      this.dias.push(({
        ejercicio: this.ejerciciosDia4
      }));
    }
    if (this.ejerciciosDia5.length > 0) {
      this.dias.push(({
        ejercicio: this.ejerciciosDia5
      }));
    }
    // Si hay dias rellenados creamos la tabla y la mandamos a la api
    if (this.dias.length > 0) {
      this.tabla = ({
        usuario: this.idUsuario,
        nombre: this.formNuevaTabla.controls.nombreTabla.value,
        dia: this.dias
      });
      this.tablasService.crearTabla(this.tabla);
      this.toastr.success('', 'Tabla creada correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/tablas']);

    } else {
      this.toastr.warning('', 'No hay ningun ejercicio en la tabla', {
        timeOut: 3000,
      });
    }
  }

  //#endregion

}
