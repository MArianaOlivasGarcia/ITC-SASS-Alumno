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
        public periodo: Periodo,
        public lugar_desempeno: string,
        public modalidad: string,
        public horario: string,
        public tipo: string,
        public responsable: string,
        public puesto_responsable: string,
        public carreras: ItemCarreraProyecto[] = [],
        public _id?: string,
    ){}

}
