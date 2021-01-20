import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public solicitud: Solicitud;

  constructor( private solicitudService: SolicitudProyectoService,
               private activatedRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( params => {
      const { id } = params;
      this.cargarSolicitud( id );
    })
  }


  cargarSolicitud( id: string ): void {
    this.solicitudService.getById(id)
          .subscribe( solicitud => {
            this.solicitud = solicitud;
          })
  }

}
