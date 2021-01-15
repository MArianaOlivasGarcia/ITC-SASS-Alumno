import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SolicitudProyectoService {

  constructor( private http: HttpClient) { }

  createSolicitud( proyecto: Proyecto ): Observable<any> {

    const url = `${ base_url }/solicitud`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.post( url, proyecto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  }


  getByAlumno( ): Observable<any> {

    const url = `${ base_url }/solicitud/alumno`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  }


}
