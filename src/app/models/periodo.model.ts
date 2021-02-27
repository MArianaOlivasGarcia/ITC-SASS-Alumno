
export class Periodo {

    constructor(
        public fecha_inicio: Date,
        public fecha_termino: Date,
        public nombre?: string,
        public isActual?: boolean,
        public isProximo?: boolean,
        public recepcion_solicitudes?: {
            inicio: Date,
            termino: Date,
        },
        public _id?: string
    ){} 
}
