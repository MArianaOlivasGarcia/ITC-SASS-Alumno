import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient ) { }


  actualizarUsuario( usuario: Usuario ): Observable<any> {
    const url = `${ base_url }/alumno/${ usuario._id }`;
    return this.http.put( url, usuario )
          .pipe(
            map( (resp: {status: boolean, alumno: Usuario}) => {
              return resp.alumno;
            })
          );
  }

}
