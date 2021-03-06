import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarProyectos } from '../interfaces/cargar-proyectos.interface';
import { Carrera } from '../models/carrera.model';
import { Proyecto } from '../models/proyecto.model';
import { Solicitud } from '../models/solicitud-proyecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('accessToken') || '';
  }


  getProyectosByCarrera( desde: number = 0, carrera: Carrera ): Observable<any> {

    const url = `${ base_url }/proyecto/all/carrera/${ carrera._id }?desde=${ desde }`;

    return this.http.get<CargarProyectos>( url )
        .pipe(
          map( resp => {
            const proyectos = resp.proyectos.map(
                                    proyecto => new Proyecto(
                                      proyecto.apoyo_economico,
                                      proyecto.nombre,
                                      proyecto.dependencia,
                                      proyecto.objetivo,
                                      proyecto.actividades,
                                      proyecto.lugar_desempeno,
                                      proyecto.instalacion,
                                      proyecto.modalidad,
                                      proyecto.horario,
                                      proyecto.tipo,
                                      proyecto.tipo_actividades,
                                      proyecto.responsable,
                                      proyecto.puesto_responsable,
                                      proyecto.email_responsable,
                                      proyecto.telefono_responsable,
                                      proyecto.carreras,
                                      proyecto.periodo,
                                      proyecto.fecha_inicial,
                                      proyecto.fecha_limite,
                                      proyecto._id )
                                  );
            return {
              total: resp.total,
              proyectos,
            };
          })
        );

  }

  getProyecto( id: string ): Observable<any> {

    const url = `${ base_url }/proyecto/${ id }`;
    return this.http.get( url )
        .pipe(
          map( (resp: { status: boolean, proyecto: Proyecto } ) => resp.proyecto )
        );

  }

 
  crearProyecto( solicitud: Solicitud ): Observable<any> {
    const url = `${ base_url }/proyecto/create/alumno`;
    return this.http.post( url, solicitud );
  }

  actualizarProyecto( solicitud: Solicitud ): Observable<any> {
    const url = `${ base_url }/proyecto/alumno/${ solicitud.proyecto._id }`;
    return this.http.put( url, solicitud );
  }

  getByAlumno(): Observable<any> {
    const url =  `${ base_url }/proyecto/alumno`;

    return this.http.get( url ).pipe(
      map( (resp: {status: boolean, proyecto: Proyecto}) => resp.proyecto)
    );
  }


}

