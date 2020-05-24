import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { NavbarComponent } from '../navbar/navbar.component';

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
    private autentificacionService: AutentificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
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
    const usuario: Usuario = {
      dni: this.formLogin.controls.dni.value,
      password: this.formLogin.controls.password.value
    };
    const dni = this.formLogin.controls.dni.value;
    const password = this.formLogin.controls.password.value;

    this.autentificacionService.loginUsuario(dni, password).subscribe(res => {
      NavbarComponent.updateUserStatus.next(true); // here!
      this.router.navigate(['/menu']);
    });
  }

  // Comprobamos hay algun usuario ya logeado y si es que si mandamos a menu directamente
  usuarioLogeado() {
    if (this.autentificacionService.comprobarAutentificacion()) {
      this.router.navigate(['/menu']);
    }
  }

  //#endregion


}
