import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-util-calendario-cabecera',
  templateUrl: './util-calendario-cabecera.component.html',
  styleUrls: ['./util-calendario-cabecera.component.scss']
})
export class UtilCalendarioCabeceraComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale = 'es-ES';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
