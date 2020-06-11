import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms/';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EjercicioEjemplo } from 'src/app/modelos/ejercicioEjemplo';
import { EjerciciosService } from 'src/app/servicios/ejerciciosService';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-crear-ejercicios',
  templateUrl: './crear-ejercicios.component.html',
  styleUrls: ['./crear-ejercicios.component.scss']
})
export class CrearEjerciciosComponent implements OnInit {
  //#region VARIABLES

  // Formulario
  formNuevoEjercicio: FormGroup;

  // Ejercicio nuevo que mandaremos a guardar con api
  ejercicio: EjercicioEjemplo;

  // Variable donde guardamos URL de la imagen que subimos
  nombreImagen;

  // Variable donde guardamos imagen que subimos al file
  imagen: File;

  // Variable formateada para mandarla a la api
  imagenFormateada = new FormData();

  //#endregion

  constructor(
    private localService: LocalService, // Servicio para comprobar acceso
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    private ejerciciosService: EjerciciosService // Servicio con el que mandamos a api el ejercicio nuevo
  ) {
    this.setformNuevaTabla();
  }


  ngOnInit(): void {
    // En este componente solo puede entrar un administrador, comprobamos y si no lo es lo echamos
    const acceso = this.localService.getAccesoUsuario();
    if (acceso !== '1') {
      this.toastr.error('Falta de permisos para esta accion');
      this.router.navigate(['/menu']);
    }
  }

  //#region FUNCIONES

  private setformNuevaTabla() {
    this.formNuevoEjercicio = this.formBuilder.group({
      nombre: new FormControl(null, Validators.required),
      zona: new FormControl(null, Validators.required),
      explicacion: new FormControl(null, Validators.required),
      consejos: new FormControl(null),
      imagen: new FormControl(null, Validators.required),
      video: new FormControl(null),
    });
  }

  // Funcion con la que cogemos nombre de imagen del file y añadimos la ruta donde la guardaremos para mandar a api
  fileChange(element) {
    this.nombreImagen = element.target.files[0].name;
    this.imagenFormateada.append('file', element.target.files[0]);
  }


  // Funcion guardamos ejercicio y mandamos con servicio a la api para guardar en BBDD
  guardarEjercicio() {
    this.ejercicio = ({
      nombre: this.formNuevoEjercicio.controls.nombre.value,
      zona: this.formNuevoEjercicio.controls.zona.value,
      explicacion: this.formNuevoEjercicio.controls.explicacion.value,
      consejos: this.formNuevoEjercicio.controls.consejos.value,
      imagen: this.nombreImagen,
      video: this.formNuevoEjercicio.controls.video.value,
    });
    // Mandamos tabla con api a la bbdd
    this.ejerciciosService.crearEjercicio(this.ejercicio, this.imagenFormateada).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Ejercicio creado correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/ejercicios']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al crear ejercicio');
    });
  }

  //#endregion

}
