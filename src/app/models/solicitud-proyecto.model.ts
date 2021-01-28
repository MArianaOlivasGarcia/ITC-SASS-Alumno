import { Proyecto } from "./proyecto.model";
import { Usuario } from "./usuario.model";


export class Solicitud {

    constructor(
        public proyecto: Proyecto,
        public inicio_servicio?: Date,
        public termino_servicio?: Date,
        public fecha_solicitud?: Date,
        public alumno?: Usuario,
        public pendiente?: boolean,
        public aceptado?: boolean,        
        public rechazado?: boolean,
        public usuario_reviso?: any,
        public error?: {
            motivo: string,
            observacion: string
        },
        public _id?: string
    ){}

}