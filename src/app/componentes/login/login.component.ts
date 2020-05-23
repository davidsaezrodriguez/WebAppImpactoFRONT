import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region  VARIABLES

  // Formulario
  public formLogin: FormGroup;

  //#endregion

  //#region FORMULARIOS
  private setFormLogin() {
    this.formLogin = this.formBuilder.group({
      dni: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  //#endregion

  //#region FUNCIONES PRINCIPALES
  constructor(
    private autentificacionService: AutentificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.setFormLogin();
  }
  accederApp(): void {
    const usuario: Usuario = {
      dni: this.formLogin.controls.dni.value,
      password: this.formLogin.controls.password.value
    };
    const dni = this.formLogin.controls.dni.value;
    const password = this.formLogin.controls.password.value;

    this.autentificacionService.loginUsuario(dni,password).subscribe(res => {
      this.router.navigate(['/menu']);
    });
  }

  //#endregion


}
