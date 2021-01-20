import { Proyecto } from "./proyecto.model";
import { Usuario } from "./usuario.model";


export class Programa {

    constructor( 
        public fecha_inicio: Date,
        public fecha_termino: Date,
        public alumno? : Usuario,
        public proyecto? : Proyecto,
        public _id? : string
    ){}

}