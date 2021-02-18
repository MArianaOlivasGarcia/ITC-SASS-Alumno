import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-expediente-page',
  templateUrl: './expediente-page.component.html',
  styleUrls: ['./expediente-page.component.css']
})
export class ExpedientePageComponent implements OnInit {


  public usuario: Usuario;
  public expediente: Expediente;
  public proyecto: Proyecto;

  public isCompleto: boolean = false; // Perfil completo
  public cargando: boolean = true;

  constructor( private authService: AuthService,
               private expedienteService: ExpedienteService,
               private proyectoService: ProyectoService ) {
      this.usuario = this.authService.usuario;
      if ( this.usuario.firma && this.usuario.foto && this.usuario.terminos ) { this.isCompleto = true }
  }

  ngOnInit(): void { 
    this.cargarProyecto(); 
    this.cargarExpediente(); 
  }


  cargarExpediente(): void {
    this.expedienteService.getExpedienteByAlumno()
          .subscribe( expediente => {
            this.expediente = expediente;
            this.cargando = false;
          })
  }

  cargarProyecto(): void {
    this.proyectoService.getByAlumno()
          .subscribe( proyecto => {
            this.proyecto = proyecto;
          })
  }


 




}
