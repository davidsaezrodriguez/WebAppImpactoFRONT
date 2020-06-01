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
    ejercicio: Ejercicio[];
}
export interface Ejercicio {
    nombre: String;
    repeticiones: String;
}
