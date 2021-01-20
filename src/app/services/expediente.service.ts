import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Expediente } from '../models/expediente.model';
import { ItemExpediente } from '../models/item-expediente.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor( private http: HttpClient ) { }


  crearExpediente(): Observable<any> {
    const url = `${ base_url }/expediente/create`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get( url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status: boolean, expediente: Expediente}) => resp.expediente )
    );
  }



  getExpedienteByAlumno(): Observable<any> {
    const url = `${ base_url }/expediente/alumno`;
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get( url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {status: boolean, expediente: Expediente}) => resp.expediente )
    );
  }



  getItemExpediente( id: string ): Observable<any> {
    const url = `${ base_url }/item/${ id }`;
    return this.http.get( url )
    .pipe(
      map( (resp: {status: boolean, item: ItemExpediente }) => resp.item )
    );
  }




  generarArchivo( idItem: string ) {
    const url = `${ base_url }/file/${ idItem }`;
    const token = localStorage.getItem('accessToken') || '';

    return this.http.get( url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map( (resp: {stattus:boolean, item: ItemExpediente}) => resp.item)
    );

  }
  
}
