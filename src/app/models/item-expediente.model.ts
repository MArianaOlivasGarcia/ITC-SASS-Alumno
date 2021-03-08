import { Expediente } from "./expediente.model";
import { Usuario } from "./usuario.model";


export class ItemExpediente {

    constructor(
            public numero: number,
            public expediente: Expediente,
            public titulo: string,
            public codigo: string,
            public archivoTemp: string,
            public archivoOriginal: string,
            public archivo: string,
            public aceptado: boolean,
            public rechazado: boolean,
            public pendiente: boolean,
            public disponible: boolean,
            public isEntrante: boolean,
            public proceso?: boolean,
            public iniciado?: boolean,
            public finalizado?: boolean,
            public reenvio_required?: boolean,
            public isEvaluacion?: boolean,
            public isAutoEvaluacion?: boolean,
            public isEvaluacionFinal?: boolean,
            public entrega?: boolean,
            public fecha_inicial?: Date,
            public fecha_limite?: Date,
            public fecha_entrega?: Date,
            public fecha_aprobacion?: Date,
            public error?: { 
                observacion: string, 
                motivo: string,
            },
            public alumno?: Usuario,
            public _id?: string ){}

  

}