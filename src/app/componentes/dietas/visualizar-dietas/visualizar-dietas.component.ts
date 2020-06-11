import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dieta, Alimento, Comida } from 'src/app/modelos/dieta';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { TablasService } from 'src/app/servicios/tablasService';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DietasService } from 'src/app/servicios/dietasService';
import { LocalService } from 'src/app/servicios/localService';

@Component({
  selector: 'app-visualizar-dietas',
  templateUrl: './visualizar-dietas.component.html',
  styleUrls: ['./visualizar-dietas.component.scss']
})
export class VisualizarDietasComponent implements OnInit {

  //#region VARIABLES

  // id de la dieta seleccionada que nos mandamos desde el menu de dietas
  idDieta;

  // dieta correspondiente al idDieta que nos devuelve la API
  dieta: Dieta;

  // acceso del usuario para ver si es admin
  acceso = this.localService.getAccesoUsuario();

  // Variable para verificar estar seguro de borrar o no
  checkActivado = false;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idTabla que nos manda el componente tablas
    private dietasService: DietasService, // Servicio para interactuar con API con DIETAS
    private router: Router,
    private localService: LocalService, // Servicio para buscar acceso usuario logeado en token
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) {
  }

  ngOnInit(): void {
    // Comprobamos que el usuario logeado es admin, y si no lo es e intenta entrar en el perfil de otro usuario le rederigimos a menu
    const usuarioLogeado = this.localService.getTokenData();

    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idDieta = params.idDieta;
      }
    );

    this.dietasService.buscarDieta(this.idDieta).subscribe(data => {
      // La api nos devuelve array de dietas por lo que cogemos el primero ya que solo hay 1
      this.dieta = ({
        _id: data.dieta[0]._id,
        usuario: data.dieta[0].usuario,
        nombre: data.dieta[0].nombre,
        comida: data.dieta[0].comida,
        kcalTotal: data.dieta[0].kcalTotal
      });
      if (usuarioLogeado.acceso !== '1') {
        if (this.dieta) {
          if (usuarioLogeado.id !== this.dieta.usuario) {
            this.toastr.error('Falta de permisos para esta accion');
            this.router.navigate(['/menu']);
          }
        }
      }
    });
  }


  //#region FUNCIONES

  checkEliminar() {
    if (!this.checkActivado) {
      this.checkActivado = true;
    } else {
      this.checkActivado = false;

    }
  }
  eliminarDieta() {
    this.dietasService.eliminarDieta(this.idDieta).subscribe(res => {
      // Si se elimina corectamente
      this.toastr.success('', 'Dieta eliminada correctamente', {
        timeOut: 3000,
      });
      this.router.navigate(['/dietas']);
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al eliminar la dieta');
    });
  }

  //#endregion
}




