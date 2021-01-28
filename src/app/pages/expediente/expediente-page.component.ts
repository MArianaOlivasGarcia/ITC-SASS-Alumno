import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';

@Component({
  selector: 'app-expediente-page',
  templateUrl: './expediente-page.component.html',
  styleUrls: ['./expediente-page.component.css']
})
export class ExpedientePageComponent implements OnInit {


  public usuario: Usuario;

  public expediente: Expediente;

  public hasProyecto: boolean = false; // Solicitud de proyecto aceptada
  public isCompleto: boolean = false; // Perfil completo

  public cargando: boolean = true;

  constructor( private authService: AuthService,
               private solicitudService: SolicitudProyectoService,
               private expedienteService: ExpedienteService ) {
      this.usuario = this.authService.usuario;
      if ( this.usuario.firma && this.usuario.foto && this.usuario.terminos ) { this.isCompleto = true}
  }

  ngOnInit(): void { 
    this.cargarProyecto();
    

    this.cargarExpediente();  

  }

  

  cargarProyecto(): void {
    this.solicitudService.getAceptadoByAlumno()
            .subscribe( proyecto => {
              if( proyecto ) {
                this.hasProyecto = true;
              } 
            })
  }


  cargarExpediente(): void {
    this.expedienteService.getExpedienteByAlumno()
          .subscribe( expediente => {
            console.log(expediente)
            this.expediente = expediente;
            this.cargando = false;
          })
  }



  abrirExpediente(){
    this.expedienteService.crearExpediente()
          .subscribe( () => {
            this.cargarExpediente();
          })
  }

 




}
