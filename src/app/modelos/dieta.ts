// tslint:disable: ban-types
export interface Dietas {
    dietas: Dieta[];
}
export interface Dieta {
    _id?: String;
    usuario: String;
    nombre: String;
    comida: Comida[];
    kcalTotal;
}
export interface Comida {
    _id?: String;
    alimento: Alimento[];
}
export interface Alimento {
    _id?: string;
    nombre: String;
    cantidad: String;
    kcal: Number;
}
