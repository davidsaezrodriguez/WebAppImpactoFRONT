import { LocalService } from '../../../servicios/localService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tabla, Tablas, CambiosPeso } from 'src/app/modelos/tabla';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { TablasService } from 'src/app/servicios/tablasService';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar-tablas',
  templateUrl: './visualizar-tablas.component.html',
  styleUrls: ['./visualizar-tablas.component.scss']
})
export class VisualizarTablasComponent implements OnInit {

  //#region VARIABLES

  // id de la tabla seleccionada que nos mandamos desde el menu de tablas
  idTabla;

  // tabla correspondiente al idTabla que nos devuelve la API
  tabla: Tabla;

  // Formulario para guardar peso maximo de ejercicio
  formPesoMax: FormGroup;

  // Array donde guardaremos los pesos maximos guardados para despues mandarlos con api a BBDD
  cambiosPesoMax: Array<CambiosPeso> = [];

  // Variable para verificar estar seguro de borrar o no
  checkActivado = false;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idTabla que nos manda el componente tablas
    private tablasService: TablasService, // Servicio para interactuar con API con TABLAS
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
    private localService: LocalService // Servicio para comprobar usuario logeado
  ) {
    this.setformPesoMax();
  }

  ngOnInit(): void {

    // Comprobamos que el usuario logeado es admin, y si no lo es e intenta entrar en el perfil de otro usuario le rederigimos a menu
    const usuarioLogeado = this.localService.getTokenData();


    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idTabla = params.idTabla;
      }
    );

    this.tablasService.buscarTabla(this.idTabla).subscribe(data => {
      // La api nos devuelve array de tablas por lo que cogemos el primero ya que solo hay 1
      this.tabla = ({
        _id: data.tabla[0]._id,
        usuario: data.tabla[0].usuario,
        nombre: data.tabla[0].nombre,
        dia: data.tabla[0].dia,
      });
      if (usuarioLogeado.acceso !== '1') {
        if (this.tabla) {
          if (usuarioLogeado.id !== this.tabla.usuario) {
            this.toastr.error('Falta de permisos para esta accion');
            this.router.navigate(['/menu']);
          }
        }
      }

    });

  }


  //#region FUNCIONES

  private setformPesoMax() {
    this.formPesoMax = this.formBuilder.group({
      pesoMax: new FormControl(null)
    });
  }

  // Funcioon que guardara el nuevo peso al notar un cambio en el input correspondiente
  actualizarPeso(idEjercicio, idDia) {
    const pesoMaxActualizado = {
      idTabla: this.idTabla,
      idDia,
      idEjercicio,
      pesoMax: this.formPesoMax.controls.pesoMax.value
    };
    // Por cada peso guardamos un objeto en el array de cambios que luego mandaremos a la api
    this.cambiosPesoMax.push(pesoMaxActualizado);
  }

  // Funcion con la que mandamos un array con todos los pesos cambiados a la bbdd con la api
  actualizarPesosTabla() {
    this.tablasService.actualizarPesoMax(this.cambiosPesoMax).subscribe(res => {
      // Si se actualizan sin problema mandamos mensaje de todo OK
      this.toastr.success('', 'Pesos actualizados', {
        timeOut: 3000,
      });
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al actualziar pesos');
    });

    this.toastr.success('', 'Pesos actualizados', {
      timeOut: 3000,
    });
    this.cambiosPesoMax = [];
  }

  checkEliminar() {
    if (!this.checkActivado) {
      this.checkActivado = true;
    } else {
      this.checkActivado = false;
    }
  }
  eliminarTabla() {
    this.tablasService.eliminarTabla(this.idTabla).subscribe(res => {
      // Si se elimina corectamente
      this.toastr.success('', 'Tabla eliminada correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/tablas']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al eliminar la tabla');
    });
  }

  //#endregion
}

