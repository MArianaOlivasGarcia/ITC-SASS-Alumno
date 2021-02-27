import { ItemExpediente } from "./item-expediente.model";
import { Usuario } from "./usuario.model";


export class Expediente {

    constructor(
        public alumno?: Usuario,
        public items?: ItemExpediente[],
        public apertura?: Date,
        public cierre?: Date,
        public _id?: string
    ){}

    
}  