import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';

@Component({
  selector: 'app-expediente-page',
  templateUrl: './expediente-page.component.html',
  styleUrls: ['./expediente-page.component.css']
})
export class ExpedientePageComponent implements OnInit {


  public usuario: Usuario;
  public isValido: boolean = true; // Solicitud de proyecto aceptada
  public isCompleto: boolean = false; // Perfil completo
  public hasPrograma: boolean;

  constructor( private authService: AuthService,
               private solicitudService: SolicitudProyectoService) {
      this.usuario = this.authService.usuario;
      if ( this.usuario.firma && this.usuario.foto && this.usuario.terminos ) { this.isCompleto = true}
  }

  ngOnInit(): void { 
    this.cargarProyecto();    
  }

  addSolicitud( hasPrograma: boolean ){
    this.hasPrograma = hasPrograma;
  }

  cargarProyecto(): void {
    this.solicitudService.getAceptadoByAlumno()
            .subscribe( proyecto => {
              if( !proyecto ) {
                this.isValido = false;
              } 
            })
  }

 




}
