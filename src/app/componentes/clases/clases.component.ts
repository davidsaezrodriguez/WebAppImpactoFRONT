import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation, EventEmitter, Output, Input, } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { DOCUMENT, DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CustomEventTitleFormatter } from '../adicionales/util-calendario/util-calendario-customEventTitleFormatter/custom-event-title-formatter.provider';
import { LocalService } from 'src/app/servicios/localService';
import { Clase } from 'src/app/modelos/clase';
import { ClasesService } from 'src/app/servicios/clasesService';
import { Usuario } from 'src/app/modelos/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clases',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class ClasesComponent implements OnInit {

  //#region VARIABLES

  // Variable comprobar acceso de usuario logeado
  acceso = this.localService.getAccesoUsuario();
  // Usuario logeado
  usuario: Usuario;

  // Variables para manejar el CALENDARIO

  // Indicamos mes que visualizar
  view: CalendarView = CalendarView.Month;

  // Inficamos fecha de hoy
  viewDate = new Date();

  // Quitamos fines de semana del caledario ya que no hay clases
  excludeDays: number[] = [0, 6];

  // Eventos (clases) que apareceran en el calendario
  events: CalendarEvent[];

  // Comprobar abrir dia seleccionado
  activeDayIsOpen: boolean;

  // Mes seleccionado en calendario para formatearlo y poner letra mayuscula mas adelante
  pipe = new DatePipe('es-ES'); // Use your own locale
  mesSeleccionado;

  // Variable que usamos para indicar al calendario que refresque cuando cargamos clases
  refresh: Subject<any> = new Subject();

  // Variable que usamos para crear la accion de apuntarse a clase en el calendario
  actionsAsistir: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"> <span class="labelBoton"> Asistir a la clase </span></i>',
      cssClass: 'botonAsistir',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.apuntarseClase(event.id);
      },
    },
  ];

  // Variable que usamos para crear la accion de salirte de la clase en el calendario
  actionsNoAsistir: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-trash-alt"><span class="labelBoton">Salir de la clase</span></i>',
      cssClass: 'botonNoAsistir',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.desapuntarseClase(event.id);
      },
    },
  ];

  // Variable que usamos para crear accion de clase completa
  actionsClaseLlena: CalendarEventAction[] = [
    {
      label: '<span class="labelBoton">Clase llena</span>',
      cssClass: 'claseLlena',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.toastr.warning('', 'Clase completa', {
          timeOut: 3000,
        });
      },
    },
  ];

  //#endregion

  constructor(
    private localService: LocalService, // Servicio para comprobar acceso de persona logeada
    private clasesService: ClasesService, // Servicio con el que gestionamos las clases
    private router: Router,
    private toastr: ToastrService, // Servicio que nos creara notificaciones
  ) { }

  ngOnInit(): void {
    this.events = [];
    // Cargamos eventos al calendario
    this.cargarEventosCalendario();
    // Funcion que añadira el mes al componente con mayuscula primera
    this.cambioMes();
  }

  //#region FUNCIONES

  cargarEventosCalendario() {
    // Usuario logeado
    const usuarioLoge = this.localService.getTokenData();
    this.usuario = ({
      _id: usuarioLoge.id,
      nombre: usuarioLoge.nombre
    });
    // Pedimos a la api las clases a las que asiste el usuario y las añadimos al calendario
    this.clasesService.listarClasesAsiste(this.usuario).subscribe(data => {
      this.refresh.next();
      for (const clase of data.clasesAsiste) {
        this.events.push({
          id: clase._id,
          title: clase.tipo,
          start: new Date(clase.inicio),
          end: new Date(clase.fin),
          color: clase.color,
          actions: this.actionsNoAsistir,
          cssClass: 'clase '
        });
      }
    });
    // Pedimos a la api las clases a las que NO asiste el usuario y las añadimos al calendario separando completas de las que hay hueco
    this.clasesService.listarClasesNoAsiste(this.usuario).subscribe(data => {
      if (data.clasesNoLlenas) {
        this.refresh.next();
        for (const clase of data.clasesNoLlenas) {
          this.events.push({
            id: clase._id,
            title: clase.tipo,
            start: new Date(clase.inicio),
            end: new Date(clase.fin),
            color: clase.color,
            actions: this.actionsAsistir,
            cssClass: 'clase '
          });
        }
      }
      if (data.clasesLlenas) {
        this.refresh.next();
        for (const clase of data.clasesLlenas) {
          this.events.push({
            id: clase._id,
            title: clase.tipo,
            start: new Date(clase.inicio),
            end: new Date(clase.fin),
            color: clase.color,
            actions: this.actionsClaseLlena,
            cssClass: 'clase '
          });
        }
      }
    });
  }

  // Funcion para apuntarse a la clase
  apuntarseClase(idClase) {
    //  Mandamos orden de apuntar al usuario de la clase
    this.clasesService.anadirAlumnoClase(idClase, this.usuario).subscribe(res => {
      // Si se apunta correctamente mandamos mensaje
      this.toastr.success('', 'Usuario apuntao a la clase', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos añadidos y vaciar campos
      // this.router.navigate(['/menu']);
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al apuntarse a la clase');
    });

  }

  // Funcion para desapuntarse de la clase
  desapuntarseClase(idClase) {
    //  Mandamos orden de desapuntar al usuario de la clase
    this.clasesService.eliminarAlumnoClase(idClase, this.usuario).subscribe(res => {
      // Si se desapunta correctamente mandamos mensaje
      this.toastr.success('', 'Usuario desapuntado de la clase', {
        timeOut: 3000,
      });
      // Recargamos componente para ver datos añadidos y vaciar campos
      this.ngOnInit();
    }, err => {
      // Si da error lo mostramos
      this.toastr.error('Error al eliminar usuario de la clase');
    });
  }

  // Funcion con la que añadiremos al componente el titulo del mes del calendario con 1 letra mayus
  cambioMes() {
    const mesSeleccionado = this.pipe.transform(this.viewDate, 'MMMM yyyy');
    this.mesSeleccionado = mesSeleccionado.charAt(0).toUpperCase() + mesSeleccionado.slice(1);
  }

  // Funcion que nos despliega las clases del dia al seleccionarlo
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  //#endregion

}
