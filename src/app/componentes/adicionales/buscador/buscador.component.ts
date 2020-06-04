
import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export interface ConfiguracionBuscador {
  values: any[];
  selected: any;
  filter: string;
  placeholder: string;
  empty: string;
  fontSize: string;
  fontColor: string;
  inputClass?: string;
  render: (object) => string;
}

// tslint:disable no-input-rename no-output-rename component-selector

@Component({

  selector: 'buscador-component',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  //#region VARIABLES

  // Config que recibimos del padre para la configuracion del componente
  @Input('config') config: ConfiguracionBuscador;

  // Valor que emitimos al padre (objeto seleccionado de la lista)
  @Output('selected') selected: EventEmitter<object> = new EventEmitter();

  // Modal en el que mostramos la lista
  @ViewChild('autocompleteList') autocompleteList: ElementRef;

  // openModal = controla el abrir y cerrar el modal
  openModal = false;

  // dirtyInput = controla si escribo en el input (si escribo y al seleccionar selecciono fuera borro el input y emito un null)
  dirtyInput = false;

  // inputLoader = no se esta usando, era para mostrar simbolo de "cargando" en input, se añade al listado, con la variable listLoader
  inputLoader = false;

  // listLoader = muestra el simbolo de "cargando" en el listado
  listLoader = false;

  form: FormGroup;
  listObjects: any[] = [];

  //#endregion

  constructor(
    private fb: FormBuilder,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.setForm();

    if (this.config.selected) {
      this.form.controls.input.setValue(this.getFilterValue(this.config.selected));
    }
    this.setFormListeners();
  }
  private setForm() {
    this.form = this.fb.group({
      input: new FormControl(''),
    });

  }

  //#region FUNCIONES
  private setFormListeners() {
    if (this.form) {
      this.form.controls.input.valueChanges.subscribe(() => {
        this.listLoader = true;
        this.dirtyInput = true;
        this.openModal = true;
      });
      this.form.controls.input.valueChanges.subscribe(data => {
        this.filterObjects(data);
      });
    }
  }


  // Metodos para filtrar las palabras y que no haya problemas al realizar la busqueda
  private getFilterValue(item: object): string {
    const property = item[this.config.filter];
    if (typeof (property) === 'function') {
      return property.call(item);
    }
    return property;
  }

  private filterObjects(search: string) {
    this.listObjects = this.config.values.filter(object => {
      if (this.getFilterValue(object) && typeof search === 'string') {
        const name = this.getFilterValue(object)
          .toLowerCase()
          .replace('á', 'a').replace('é', 'e')
          .replace('ì', 'i').replace('ó', 'o')
          .replace('ú', 'u');
        return name.includes(
          search.toLocaleLowerCase()
            .replace('á', 'a').replace('é', 'e')
            .replace('ì', 'i').replace('ó', 'o')
            .replace('ú', 'u')
        );
      }
    });

    this.listLoader = false;
    if (this.listObjects.length > 10) {
      this.autocompleteList.nativeElement.style.height = '200px';
    } else if (this.listObjects.length === 0) {
      this.autocompleteList.nativeElement.style.height = '28px';
    } else {
      this.autocompleteList.nativeElement.style.height = (this.listObjects.length * 28) + 'px';
    }
  }

  showAutocomplete() {
    this.filterObjects(this.form.controls.input.value);
    this.openModal = true;
  }

  // Este metodo cierra el modal
  // Si selecciono un elemento (evento click): relleno el valor y lo emito
  // Si no selecciono un elemento (evento blur, hago click fuera de la lista) y el input ha sido editado: limpio el campo y emito un null
  selectObject(object) {
    if (this.openModal) {
      if (object) {
        this.form.controls.input.setValue(this.getFilterValue(object), { emitEvent: false });
        this.form.controls.input.markAsDirty();
        this.dirtyInput = false;
        this.selected.emit(object);
      } else if (this.dirtyInput) {
        this.clearInput(false);
        this.dirtyInput = false;
        this.selected.emit(object);
      }
      this.openModal = false;
    }
  }

  // Limpiamos el input
  clearInput(isNew) {
    this.form.controls.input.setValue('', { emitEvent: false });
    if (isNew) {
      this.form.controls.input.markAsPristine();
    }
  }
  //#endregion
}
