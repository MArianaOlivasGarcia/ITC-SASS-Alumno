import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';

@Component({
  selector: 'app-proyecto-personal',
  templateUrl: './proyecto-personal.component.html',
  styleUrls: ['./proyecto-personal.component.css']
})
export class ProyectoPersonalComponent implements OnInit {

  public solicitud: Solicitud;

  public cargando: boolean = true;

  constructor( private solicitudService: SolicitudProyectoService ) { }

  ngOnInit(): void {
    this.cargarSolicitudPersonal()
  }


  cargarSolicitudPersonal():void {

    this.solicitudService.getSolicitudAndProyectoPersonal()
          .subscribe( solicitud =>{
             this.solicitud = solicitud
             this.cargando = false
          })

  }

 
}
