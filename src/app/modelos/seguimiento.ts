// tslint:disable: ban-types
export interface Seguimiento {
    _id?: String;
    usuario: String;
    indice?: Indice[];
    medida?: Medida[];
}

export interface Indice {
    _id?: string;
    fecha: any;
    peso: Number;
    altura: Number;
    imc: Number;
    grasa: Number;
}

export interface Medida {
    _id?: string;
    fecha: any;
    biceps: Number;
    hombros: Number;
    pecho: Number;
    cintura: Number;
    gluteo: Number;
    muslo: Number;
}