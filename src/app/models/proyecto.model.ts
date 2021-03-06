import { Dependencia } from "./dependencia.model";
import { ItemCarreraProyecto } from "./item-carrera-proyecto.model";
import { Periodo } from "./periodo.model";

export class Proyecto {

    constructor(
        public apoyo_economico: string,
        public nombre: string,
        public dependencia: Dependencia,
        public objetivo: string,
        public actividades: string,
        public lugar_desempeno: string,
        public instalacion: boolean,
        public modalidad: string,
        public horario: string,
        public tipo: string,
        public tipo_actividades: string,
        public responsable: string,
        public puesto_responsable: string,
        public email_responsable: string,
        public telefono_responsable: string,
        public carreras: ItemCarreraProyecto[] = [],
        public periodo?: Periodo,
        public fecha_inicial?: Date,
        public fecha_limite?: Date,
        public _id?: string,
    ){}

}
