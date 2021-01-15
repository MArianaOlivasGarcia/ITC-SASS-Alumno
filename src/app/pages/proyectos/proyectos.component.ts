import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalProyectoService } from 'src/app/services/modal-proyecto.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public totalProyectos = 0;
  public proyectos: Proyecto[] = [];
  public proyectosTemp: Proyecto[] = [];
  public cargando: boolean = true;

  public proyectoSeleccionado: Proyecto;
  /*   public proyectoPersonal: Proyecto;*/
  public solicitud: Solicitud;

  public usuario: Usuario;


  constructor( private proyectoService: ProyectoService,
               private authService: AuthService,
               private busquedaService: BusquedaService,
               private solicitudService: SolicitudProyectoService,
               private modalService: ModalProyectoService ) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarSolicitud();
/*     this.getProyectoPersonal();
 */  
  }

  addSolicitud( solicitud: Solicitud ){
    this.solicitud = solicitud;
  }


  cargarSolicitud(): void {
    this.solicitudService.getByAlumno()
            .subscribe( ({solicitud}) => {
              if ( solicitud ) {
                this.solicitud = solicitud;
              }
            })
  }


  cargarProyectos(): void {

    this.cargando = true;

    this.proyectoService.getProyectosByCarrera( this.usuario.carrera )
        .subscribe( ({ total, proyectos }) => {
          this.totalProyectos = total;
          this.proyectos = proyectos;
          this.proyectosTemp = proyectos;
          this.cargando = false;
        });

  }


  /* getProyectoPersonal():void {
    this.proyectoService.getPersonal()
        .subscribe( resp => {
          this.proyectoPersonal = resp;
        })
  } */
  


  buscar( termino: string ): void {

    if ( termino.length === 0 ) {
      this.proyectos = this.proyectosTemp;
      return;
    }

    this.busquedaService.busqueda( this.authService.usuario.carrera, termino )
        .subscribe( resp => this.proyectos = resp );

  }



  abrirModal( proyecto: Proyecto ): void {
    this.proyectoSeleccionado = proyecto;
    this.modalService.abrirModal()
  }

  // CAMBIAR PAGINA

}