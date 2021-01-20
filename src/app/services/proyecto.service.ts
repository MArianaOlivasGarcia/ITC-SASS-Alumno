import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarProyectos } from '../interfaces/cargar-proyectos.interface';
import { Carrera } from '../models/carrera.model';
import { Proyecto } from '../models/proyecto.model';

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
                                      proyecto.periodo,
                                      proyecto.lugar_desempeno,
                                      proyecto.modalidad,
                                      proyecto.horario,
                                      proyecto.tipo,
                                      proyecto.responsable,
                                      proyecto.puesto_responsable,
                                      proyecto.carreras,
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

 
  crearProyecto( proyecto: Proyecto ): Observable<any> {
    const url = `${ base_url }/proyecto/create/alumno`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.post( url, proyecto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  actualizarProyecto( proyecto: Proyecto ): Observable<any> {
    const url = `${ base_url }/proyecto/alumno/${ proyecto._id }`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.put( url, proyecto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  



  getPersonal(): Observable<any> {
    const url =  `${ base_url }/proyecto/alumno/personal`;
    const token = localStorage.getItem('accessToken') || '';

    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
  }



  getByAlumno(): Observable<any> {
    const url =  `${ base_url }/proyecto/alumno`;
    const token = localStorage.getItem('accessToken') || '';

    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status: boolean, proyecto: Proyecto}) => resp.proyecto)
    );
  }


}

