import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';
import { Dependencia } from '../models/dependencia.model';
import { Proyecto } from '../models/proyecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }

  private transformarDependencias( resultados: any[] ): Dependencia[] {
    return resultados.map(
      dep => new Dependencia( dep.nombre,
                              dep.representante_legal,
                              dep.domicilio,
                              dep.email,
                              dep.id ));
  }

  private transformarProyectos( resultados: any[] ): Proyecto[] {
    return resultados.map(
      proyecto => new Proyecto( proyecto.apoyo_economico,
                                proyecto.nombre,
                                proyecto.dependencia,
                                proyecto.objetivo,
                                proyecto.actividades,
                                proyecto.periodo,
                                proyecto.lugar_desempeno,
                                proyecto.modalidad,
                                proyecto.horario,
                                proyecto.tipo,
                                proyecto.responsable,
                                proyecto.puesto_responsable,
                                proyecto.carreras,
                                proyecto._id ));
  }

  busquedaProyectoByCarrera( carrera: Carrera,
            termino: string ): Observable<any> {

    const url = `${ base_url }/busqueda/proyectos/${ carrera._id }/${ termino }`;

    return this.http.get( url )
                .pipe(
                  map( (resp: any) => this.transformarProyectos( resp.respuesta )         
                ));
  }
 


   busqueda( tipo: 'dependencias',
            termino: string ): Observable<any> {

    const url = `${ base_url }/busqueda/coleccion/${ tipo }/${ termino }`;

    return this.http.get( url )
                .pipe(
                  map( (resp: any) => {

                    switch ( tipo ) {

                      case 'dependencias':
                        return this.transformarDependencias( resp.respuesta );

                      
                      default:
                        return [];
                    }

                  })
                );
  }

}
