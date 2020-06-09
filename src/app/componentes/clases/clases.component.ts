import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation, } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTitleFormatter } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { DOCUMENT, DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CustomEventTitleFormatter } from '../adicionales/util-calendario/util-calendario-customEventTitleFormatter/custom-event-title-formatter.provider';

// Colores que se usaran para marcar eventos
export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

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

  // Variables para manejar el CALENDARIO

  // Indicamos mes que visualizar
  view: CalendarView = CalendarView.Month;

  // Inficamos fecha de hoy
  viewDate = new Date();

  // Quitamos fines de semana del caledario ya que no hay clases
  excludeDays: number[] = [0, 6];

  // Eventos que apareceran en el calendario
  events: CalendarEvent[] = [];

  // Comprobar abrir dia seleccionado
  activeDayIsOpen: boolean;

  // Mes seleccionado en calendario para formatearlo y poner letra mayuscula mas adelante
  pipe = new DatePipe('es-ES'); // Use your own locale
  mesSeleccionado;

  // Variable que usamos para crear la accion de apuntarse a clase en el calendario
  actionsAsistir: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"> Asistir a la clase </i>',
      cssClass: 'botonAsistir',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
      },
    },
  ];

  // Variable que usamos para crear la accion de salirte de la clase en el calendario
  actionsNoAsistir: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-trash-alt"></i> Dejar de asistir a la clase</i>',
      cssClass: 'botonNoAsistir',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
      },
    },
  ];

  //#endregion

  constructor(
    @Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
    // Añadimos eventos recibidos de la api al calendario
    this.events.push(
      {
        id: 'asdasdsad',
        title: 'Zumba',
        // start: moment('06/09/2020 19:15:00'),
        start: new Date(2020, 5, 9, 19, 0),
        // end: moment('06/09/2020 19:30:00'),
        end: new Date(2020, 5, 9, 20, 0),
        color: colors.blue,
        actions: this.actionsAsistir
      },
      {
        title: 'GAP',
        // start: moment('06/09/2020 19:15:00').toDate(),
        start: new Date(2020, 5, 9, 19, 0),
        // end: moment('06/09/2020 19:30:00').toDate(),
        end: new Date(2020, 5, 9, 20, 0),
        color: colors.red,
        actions: this.actionsAsistir
      },
    );
    this.events.push(
      {
        title: 'GAP',
        start: new Date(2020, 5, 12, 16, 0),
        end: new Date(2020, 5, 12, 17, 0),
        color: colors.red,
        actions: this.actionsNoAsistir,
        cssClass: 'asiste'
      },
      {
        title: 'GAP',
        // start: moment('06/09/2020 19:15:00').toDate(),
        start: new Date(2020, 5, 12, 17, 0),
        // end: moment('06/09/2020 19:30:00').toDate(),
        end: new Date(2020, 5, 12, 18, 0),
        color: colors.red,
        actions: this.actionsNoAsistir,
        cssClass: 'asiste'
      },
      {
        title: 'GAP',
        // start: moment('06/09/2020 19:15:00').toDate(),
        start: new Date(2020, 5, 12, 18, 0),
        // end: moment('06/09/2020 19:30:00').toDate(),
        end: new Date(2020, 5, 12, 19, 0),
        color: colors.red,
        actions: this.actionsAsistir
      }
    );
    // Funcion que añadira el mes al componente con mayuscula primera
    this.cambioMes();
  }

  anadir(id) {

  }


  //#region FUNCIONES

  // Funcion con la que añadiremos al componente el titulo del mes del calendario con 1 letra mayus
  cambioMes(){
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
