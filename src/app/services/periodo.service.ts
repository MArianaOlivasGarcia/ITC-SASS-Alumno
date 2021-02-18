import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Periodo } from '../models/periodo.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor( private http: HttpClient ) { }

  getPeriodos(): Observable<any> {

    return this.http.get(`${base_url}/periodo/all`)
      .pipe(
        map( (resp: { status: boolean, periodos: Periodo[] } ) => {
          const periodos = resp.periodos.map(
                                  periodo => new Periodo(
                                  periodo.fecha_inicio,
                                  periodo.fecha_termino,
                                  periodo.nombre,
                                  periodo.isActual,
                                  periodo.isProximo,
                                  periodo.recepcion_solicitudes,
                                  periodo._id) );
          return periodos;
        })
      );

  }

  getPeriodoProximo(): Observable<any> {

    return this.http.get(`${base_url}/periodo/proximo`)
        .pipe(
          map( (resp: { status: boolean, periodo: Periodo } ) => resp.periodo )
        );

  }
  

  
}
