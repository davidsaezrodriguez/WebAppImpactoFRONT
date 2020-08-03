import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TablasService } from 'src/app/servicios/tablasService';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-copiar-tabla',
  templateUrl: './copiar-tabla.component.html',
  styleUrls: ['./copiar-tabla.component.scss']
})
export class CopiarTablaComponent implements OnInit {

  //#region VARIABLES

  // Formulario
  formCopiarTabla: FormGroup;

  // idUsuario que nos mandamos desde tablas para crear la tabla al usuario
  idUsuario;
  //#endregion
  constructor(
    private tablasService: TablasService, // Servicio para interactuar con API con TABLAS
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    private localService: LocalService // Servicio para comprobar usuario logeado
  ) {
    this.setformCopiarTabla();
  }

  ngOnInit(): void {
    // Comprobamos que el usuario logeado es admin, y si no lo es e intenta entrar en el perfil de otro usuario le rederigimos a menu
    const usuarioLogeado = this.localService.getTokenData();
    this.idUsuario = usuarioLogeado.id;
  }

  //#region FUNCIONES

  private setformCopiarTabla() {
    this.formCopiarTabla = new FormGroup({
      tabla: new FormControl(null, Validators.required),
    });
  }

  copiarTabla() {
    const idTabla = this.formCopiarTabla.controls.tabla.value;
    // Mandamos tabla con api a la bbdd
    this.tablasService.copiarTabla(this.idUsuario, idTabla).subscribe(res => {
      // Si se crea correctamente mandamos mensaje y redirigimos a tablas
      this.toastr.success('', 'Tabla creada correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/tablas']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al crear tabla');
    });
  }
  //#endregion

}
