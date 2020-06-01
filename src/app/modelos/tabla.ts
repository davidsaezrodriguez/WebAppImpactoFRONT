// tslint:disable: ban-types
export interface Tablas {
    tablas: Tabla[];
}
export interface Tabla {
    _id?: String;
    usuario: String;
    nombre: String;
    dia: Dia[];
}
export interface Dia {
    _id?: String;
    ejercicio: Ejercicio[];
}
export interface Ejercicio {
    _id?: string;
    nombre: String;
    repeticiones: String;
    pesoMax: String;
}

export interface CambiosPeso {
    idTabla: String;
    idDia: String;
    idEjercicio: String;
    pesoMax: String;
  }