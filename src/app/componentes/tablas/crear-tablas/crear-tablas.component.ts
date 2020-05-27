import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacionService';
import { Tabla, Ejercicio, Dia } from 'src/app/modelos/tabla';


@Component({
  selector: 'app-crear-tablas',
  templateUrl: './crear-tablas.component.html',
  styleUrls: ['./crear-tablas.component.scss']
})

export class CrearTablasComponent implements OnInit {


  public tabla: Tabla;
  public ejercicios: Ejercicio[] = [{ nombre: 'Pres banca', repeticiones: '12,12,10,10' }, { nombre: 'Pres banca', repeticiones: '12,12,10,10' }, { nombre: 'Pres banca', repeticiones: '12,12,10,10' }];
  public dias: Dia[] = [{ ejercicios: this.ejercicios }, { ejercicios: this.ejercicios }, { ejercicios: this.ejercicios }];
  constructor(
    private autentificacionService: AutentificacionService,
  ) { }


  public crearTabla() {
    this.tabla = ({
      usuario: '5ead63c220e8b00024c13b58',
      nombre: 'Febrero FUNCIONA',
      dias: this.dias
    });
    this.autentificacionService.crearTabla(this.tabla);
  }

  ngOnInit(): void {
  }

}

