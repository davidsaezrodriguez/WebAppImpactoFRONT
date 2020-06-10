import { Usuario } from './usuario';

export interface Clase {
    _id?: string;
    tipo: string;
    inicio: any;
    fin: any;
    color: any;
    maxAlumnos?: number;
    alumnos?: Usuario[];
}
