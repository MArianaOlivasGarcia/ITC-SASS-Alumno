import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChangePasswordForm } from '../interfaces/change-password-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }


  get token(): string {
    return localStorage.getItem('accessToken') || '';
  }


  get id(): string {
    return this.usuario._id || '';
  }


  validarToken(): Observable<any> {

    const token = localStorage.getItem('accessToken') || '';

    return this.http.get(`${ base_url }/alumno/renovar`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap( (resp: any) => {

        localStorage.setItem('accessToken', resp.accessToken );
        localStorage.setItem('menu', JSON.stringify(resp.menu) );
        const { numero_control,
                nombre,
                apellido_paterno,
                apellido_materno,
                sexo,
                fecha_nacimiento,
                carrera,
                semestre,
                creditos_acumulados,
                _id,
                foto,
                email,
                telefono,
                domicilio,
                numero_seguro,
                terminos,
                video,
                examen,
                online } = resp.user;
        this.usuario = new Usuario( numero_control,
                                    nombre,
                                    apellido_paterno,
                                    apellido_materno,
                                    sexo,
                                    fecha_nacimiento,
                                    carrera,
                                    semestre,
                                    creditos_acumulados,
                                    _id,
                                    foto,
                                    email,
                                    telefono,
                                    domicilio,
                                    numero_seguro,
                                    terminos,
                                    video,
                                    examen,
                                    online );
        console.log(this.usuario);
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );
  }




  login( formData: LoginForm ): Observable<any>{
    return this.http.post(`${ base_url }/alumno/login`, formData )
                  .pipe(
                    tap( (resp: any) => {
                      localStorage.setItem('accessToken', resp.accessToken );
                      localStorage.setItem('menu', JSON.stringify(resp.menu) );
                    })
                  );
  }




  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }




  changePassword( formData: ChangePasswordForm ): Observable<any> {
    const token = localStorage.getItem('accessToken') || '';
    return this.http.put(`${ base_url }/alumno/password`, formData, {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    });
  }

}
