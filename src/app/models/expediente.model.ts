import { ItemExpediente } from "./item-expediente.model";
import { Usuario } from "./usuario.model";


export class Expediente {

    constructor(
        public alumno?: Usuario,
        public items?: ItemExpediente[],
        public fecha_inicio?: Date,
        public fecha_termino?: Date,
        public _id?: string
    ){}

    
}  