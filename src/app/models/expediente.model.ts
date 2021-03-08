import { ItemExpediente } from "./item-expediente.model";
import { Usuario } from "./usuario.model";
import { Periodo } from "./periodo.model";


export class Expediente {

    constructor(
        public alumno?: Usuario,
        public items?: ItemExpediente[],
        public apertura?: Date,
        public cierre?: Date,
        public periodo?: Periodo,
        public finalizado?: boolean,
        public _id?: string
    ){}

    
}  