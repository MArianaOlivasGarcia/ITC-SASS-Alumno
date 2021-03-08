import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-proyecto-personal',
  templateUrl: './proyecto-personal.component.html',
  styleUrls: ['./proyecto-personal.component.css']
})
export class ProyectoPersonalComponent implements OnInit {

  public solicitud: Solicitud;
  public usuario: Usuario;

  public cargando: boolean = true;
  public perfilCompleto: boolean = false;

  constructor( private solicitudService: SolicitudProyectoService,
               private authService: AuthService ) {

    this.usuario = this.authService.usuario;

    if ( /* this.usuario.firma && */ this.usuario.foto && this.usuario.terminos ) { this.perfilCompleto = true }
            
  }

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
