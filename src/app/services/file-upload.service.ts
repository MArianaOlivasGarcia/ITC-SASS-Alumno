import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient ) { }

  actualizarFoto( archivo: File,  id: string  ): Observable<any>{

    const url = `${ base_url }/upload/alumnos/${ id }`;

    const formData: FormData = new FormData();
    formData.append('imagen', archivo, archivo.name );

    return this.http.put( url, formData, { reportProgress: true } )
              .pipe(
                catchError( error => of(false) )
              );

  }



  actualizarFirma( archivo: File,  id: string  ): Observable<any>{

    const url = `${ base_url }/upload/firma/alumnos/${ id }`;

    const formData: FormData = new FormData();
    formData.append('firma', archivo, archivo.name );

    return this.http.put( url, formData, { reportProgress: true } )
              .pipe(
                catchError( error => of(false) )
              );

  }



  subirArchivo( archivo: File, idItem: string ): Observable<any> {

    const url = `${ base_url }/file/item/${ idItem }`;
    const token = localStorage.getItem('accessToken') || '';


    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name );

    return this.http.put( url, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(  catchError( error => of(false) ));

  }



  


}
