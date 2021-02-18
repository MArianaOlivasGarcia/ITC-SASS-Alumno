import { environment } from '../../environments/environment';
import { Carrera } from './carrera.model';
import { Periodo } from './periodo.model';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public numero_control: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public sexo: string,
        public fecha_nacimiento: string,
        public edad: string,
        public carrera: Carrera,
        public creditos_acumulados: number,
        public porcentaje_avance: number,
        public periodo_ingreso: Periodo,
        public _id?: string,
        public semestre?: number,
        public foto?: string,
        public firma?: string,
        public email?: string,
        public telefono?: string,
        public domicilio?: {
            calle_numero: string,
            colonia: string,
            ciudad_estado: string,
        },
        public numero_seguro?: string,
        /* public proyecto?: Proyecto,*/
        /* public expediente?: Expediente, */
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
        if ( this.firma ) {
            return `${ base_url }/upload/firma/alumnos/${ this.firma }`;
        } else {
            return `${ base_url }/upload/no-image/no-image`;
        }
    }

}
