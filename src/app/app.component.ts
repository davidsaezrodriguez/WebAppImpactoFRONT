import { Component } from '@angular/core';
import { LocalService } from './servicios/localService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private localService: LocalService // Servicio para recuperar datos del localstorage
  ) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    if (!this.localService.comprobarAutentificacion()) {
      this.localService.cerrarSesion();
    }
  }
}
