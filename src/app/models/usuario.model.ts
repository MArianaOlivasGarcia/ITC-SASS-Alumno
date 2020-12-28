import { environment } from '../../environments/environment';
import { Carrera } from './carrera.model';

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
        public email?: string,
        public telefono?: string,
        public domicilio?: string,
        public numero_seguro?: string,
        public terminos?: string,
        public video?: string,
        public examen?: string,
        public online?: string,
        public password?: string,
    ){}

    get fotoUrl(): string {
        if ( this.foto ) {
            return `${ base_url }/upload/alumnos/${ this.foto }`;
        } else {
            return `${ base_url }/upload/no-image/no-image`;
        }
    }

}
