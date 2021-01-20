import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Programa } from '../models/programa.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('accessToken') || '';
  }

  crearPrograma( programa: Programa ): Observable<any> {
    const url = `${ base_url }/programa/create`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.post( url, programa, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status:boolean, programa: Programa}) => resp.programa )
    );
  }


  getByAlumno(): Observable<any> {
    const url = `${ base_url }/programa/alumno`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status:boolean, programa: Programa}) => resp.programa )
    );
  }

}
 