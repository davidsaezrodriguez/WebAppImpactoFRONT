import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuariosService';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { LocalService } from 'src/app/servicios/localService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region VARIABLES

  // Formulario
  public formLogin: FormGroup;

  //#endregion


  constructor(
    private usuariosService: UsuariosService,
    private localService: LocalService, // Servicio para recuperar datos del localstorage
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) { }

  ngOnInit() {
    this.usuarioLogeado();
    this.setFormLogin();
  }

  //#region FUNCIONES

  // FORMULARIOS
  private setFormLogin() {
    this.formLogin = this.formBuilder.group({
      dni: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  // Funcion donde mandamos usuario logeado en el formulario al servicio que nos autentifica al usuario y mandamos a menus si es valido
  accederApp(): void {
    const dni = this.formLogin.controls.dni.value;
    const password = this.formLogin.controls.password.value;

    this.usuariosService.loginUsuario(dni, password).subscribe(res => {
      // Si se el login es correcto
      NavbarComponent.updateUserStatus.next(true); // here!
      this.router.navigate(['/menu']);
    }, err => {
      if (err && err.status === 404) {
        this.toastr.error('DNI no existe');

      } else {
        this.toastr.error('Contraseña incorrecta');

      }
    });
  }

  // Comprobamos hay algun usuario ya logeado y si es que si mandamos a menu directamente
  usuarioLogeado() {
    if (this.localService.comprobarAutentificacion()) {
      this.router.navigate(['/menu']);
    }
  }

  //#endregion


}
