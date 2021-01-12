import { environment } from '../../environments/environment';
import { Carrera } from './carrera.model';
import { Proyecto } from './proyecto.model';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        // tslint:disable: variable-name
        public numero_control: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public sexo: string,
        public fecha_nacimiento: string,
        public carrera: Carrera,
        public semestre: number,
        public creditos_acumulados: number,
        public _id?: string,
        public foto?: string,
        public firma?: string,
        public email?: string,
        public telefono?: string,
        public domicilio?: string,
        public numero_seguro?: string,
        public proyecto?: Proyecto,
        public terminos?: boolean,
        public video?: boolean,
        public examen?: boolean,
        public online?: boolean,
        public password?: string,
    ){}

    get fotoUrl(): string {
        if ( this.foto ) {
            return `${ base_url }/upload/alumnos/${ this.foto }`;
        } else {
            return `${ base_url }/upload/no-image/no-image`;
        }
    }

    get firmaUrl(): string {
        if ( this.foto ) {
            return `${ base_url }/upload/firma/alumnos/${ this.firma }`;
        } else {
            return `${ base_url }/upload/no-image/no-image`;
        }
    }

}
