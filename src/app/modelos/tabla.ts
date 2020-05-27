// tslint:disable: ban-types
export interface Tablas {
    tablas: Tabla[];
}
export interface Tabla {
    _id?: String;
    usuario: String;
    nombre: String;
    dias: Dia[];
}
export interface Dia {
    ejercicios: Ejercicio[];
}
export interface Ejercicio {
    nombre: String;
    repeticiones: String;
}
