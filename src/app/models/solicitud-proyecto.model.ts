import { Proyecto } from "./proyecto.model";
import { Usuario } from "./usuario.model";


export class Solicitud {

    constructor(
        public alumno: Usuario,
        public proyecto: Proyecto,
        public pendiente?: boolean,
        public rechazado?: boolean,
        public aceptado?: boolean,
        public created_at?: Date,
        public error?: any,
        public _id?: string
    ){}

}