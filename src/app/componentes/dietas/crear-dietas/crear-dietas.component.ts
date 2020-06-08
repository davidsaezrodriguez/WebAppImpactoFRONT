import { Component, OnInit } from '@angular/core';
import { Dieta, Alimento, Comida } from 'src/app/modelos/dieta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DietasService } from 'src/app/servicios/dietasService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-dietas',
  templateUrl: './crear-dietas.component.html',
  styleUrls: ['./crear-dietas.component.scss']
})
export class CrearDietasComponent implements OnInit {
  //#region VARIABLES

  // Formulario
  formNuevaDieta: FormGroup;

  // idUsuario que nos mandamos desde dietas para crear la dieta al usuario
  idUsuario;

  // Arrays donde guardaremos los ejercicios de cada dia
  alimentosComida1: Array<Alimento> = [];
  alimentosComida2: Array<Alimento> = [];
  alimentosComida3: Array<Alimento> = [];
  alimentosComida4: Array<Alimento> = [];
  alimentosComida5: Array<Alimento> = [];

  // Array donde guardaremos las comidas de la dieta con sus alimentos
  comidas: Array<Comida> = [];

  // Dieta que mandaremos con la api a la bbdd
  dieta: Dieta;

  // Kcal totales de todos los alimentos
  kcalTotal = 0;

  //#endregion

  constructor(
    private rutaActiva: ActivatedRoute, // Clase con la que cogemos de URL el valor idUsuario que nos manda el componente tablas
    private dietasService: DietasService, // Servicio para interactuar con API con TABLAS
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService // Servicio que nos creara notificaciones
  ) {
    this.setformNuevaDieta();
  }


  ngOnInit(): void {
    // Cogemos el valor que nos manda la URL para idTabla
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idUsuario = params.idUsuario;
      }
    );
  }

  //#region FUNCIONES

  private setformNuevaDieta() {
    this.formNuevaDieta = this.formBuilder.group({
      nombreDieta: new FormControl(null, Validators.required),

      alimentoComida1: new FormControl(null, Validators.required),
      cantidadComida1: new FormControl(null, Validators.required),
      kcalComida1: new FormControl(null, Validators.required),

      alimentoComida2: new FormControl(null, Validators.required),
      cantidadComida2: new FormControl(null, Validators.required),
      kcalComida2: new FormControl(null, Validators.required),

      alimentoComida3: new FormControl(null, Validators.required),
      cantidadComida3: new FormControl(null, Validators.required),
      kcalComida3: new FormControl(null, Validators.required),

      alimentoComida4: new FormControl(null, Validators.required),
      cantidadComida4: new FormControl(null, Validators.required),
      kcalComida4: new FormControl(null, Validators.required),

      alimentoComida5: new FormControl(null, Validators.required),
      cantidadComida5: new FormControl(null, Validators.required),
      kcalComida5: new FormControl(null, Validators.required),
    });
  }

  // Funcion que usamos para añadir los alimentos a cada comida en su correspondiente array
  anadirAlimento(comida, inputAlim, inputCant, inputKcal) {
    const alimento = ({
      nombre: this.formNuevaDieta.get(inputAlim).value,
      cantidad: this.formNuevaDieta.get(inputCant).value,
      kcal: this.formNuevaDieta.get(inputKcal).value,
    });
    comida.push(alimento);
    // Añadimos kcal de alimento al total
    this.kcalTotal += this.formNuevaDieta.get(inputKcal).value;
    // Borramos inputs para añadir otro alimento
    this.formNuevaDieta.get(inputAlim).setValue(null);
    this.formNuevaDieta.get(inputCant).setValue(null);
    this.formNuevaDieta.get(inputKcal).setValue(null);
  }

  // Funcion para borrar alimento del array si se quiere al dar al boton
  borrarAlimento(comida, i) {
    // Borramos primero kcal del alimento a borrar del total y luego el alimento del array
    this.kcalTotal -= comida[i].kcal;
    comida.splice(i, 1);
  }


  // Funcion guardamos dieta y mandamos con servicio a la api para guardar en BBDD
  guardarDieta() {
    // Comporbamos si la comida tiene alimentos y si es asi la añadimos a las comidas
    if (this.alimentosComida1.length > 0) {
      this.comidas.push(({
        alimento: this.alimentosComida1
      }));
    }
    if (this.alimentosComida2.length > 0) {
      this.comidas.push(({
        alimento: this.alimentosComida2
      }));
    }
    if (this.alimentosComida3.length > 0) {
      this.comidas.push(({
        alimento: this.alimentosComida3
      }));
    }
    if (this.alimentosComida4.length > 0) {
      this.comidas.push(({
        alimento: this.alimentosComida4
      }));
    }
    if (this.alimentosComida5.length > 0) {
      this.comidas.push(({
        alimento: this.alimentosComida5
      }));
    }

    // Si hay comidas rellenados creamos la dieta y la mandamos a la api
    if (this.comidas.length > 0) {
      this.dieta = ({
        usuario: this.idUsuario,
        nombre: this.formNuevaDieta.controls.nombreDieta.value,
        comida: this.comidas,
        kcalTotal: this.kcalTotal
      });
      // Mandamos dieta con api a la bbdd
      this.dietasService.crearDieta(this.dieta).subscribe(res => {
        // Si se crea correctamente mandamos mensaje y redirigimos a tablas
        this.toastr.success('', 'Dieta creada correctamente', {
          timeOut: 3000,
        });
        this.router.navigate(['/dietas']);
      }, err => {
        // Si da error lo mostramos
        this.toastr.error('Error al crear dieta');
      });
    } else {
      // Si no hay alimentos en dieta mostramos notificacion
      this.toastr.warning('', 'No hay ningun alimento en la dieta', {
        timeOut: 3000,
      });
    }
  }

  //#endregion

}
