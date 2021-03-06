import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';
import { Solicitud } from '../models/solicitud-proyecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SolicitudProyectoService {

  constructor( private http: HttpClient) { }

  createSolicitud( solicitud: Solicitud ): Observable<any> {

    const url = `${ base_url }/solicitud`;
    return this.http.post( url, solicitud );

  }


  getByAlumno( ): Observable<any> {

    const url = `${ base_url }/solicitud/alumno`;
    return this.http.get( url );

  }


  getById( id: string ): Observable<any> {

    const url = `${ base_url }/solicitud/${ id }`;
    return this.http.get( url ).pipe(
      map( (resp: {satus: boolean, solicitud: Solicitud}) => resp.solicitud )
    );

  }


  // TODO: Verificar
  /* getAceptadoByAlumno(): Observable<any> {

    const url = `${ base_url }/solicitud/alumno/aceptado`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status: boolean, proyecto: Proyecto}) => resp.proyecto )
    );

  } */



  getSolicitudAndProyectoPersonal(): Observable<any> {
    const url =  `${ base_url }/solicitud/alumno/personal`;

    return this.http.get( url ).pipe(
      map( (resp: {status: boolean, solicitud: Solicitud}) => resp.solicitud )
    );
    
  }

}
