import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/loginService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form): void {
    this.LoginService.registrarUsuario(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
