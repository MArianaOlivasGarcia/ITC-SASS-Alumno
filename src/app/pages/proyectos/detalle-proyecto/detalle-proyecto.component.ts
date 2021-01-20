import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { ModalProyectoService } from 'src/app/services/modal-proyecto.service';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto;
  @Output() emitirSolicitud = new EventEmitter<Solicitud>();
  public solicitud: Solicitud;

  constructor( public modalService: ModalProyectoService,
               private solicitudService: SolicitudProyectoService ) { 
 }

  ngOnInit(): void {
  }


  addNuevaSolicitud(solicitud: Solicitud) {
    this.emitirSolicitud.emit(solicitud);
  }


  postular() {

    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Estas seguro que deseas postularte a este proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {

        this.solicitudService.createSolicitud( this.proyecto )
            .subscribe( ({solicitud, message}) => {
              Swal.fire({
                title: 'Solicitud Enviada',
                text: message,
                icon: 'success' 
              })
              this.solicitud = solicitud;
              this.addNuevaSolicitud(this.solicitud);
            }, err => {
              Swal.fire({
                title: 'Error',
                text: err.error.message,
                icon: 'error' 
              })
          })
    
      }
    })

  }

  cerrarModal(): void {
    this.modalService.cerrarModal();
  }

}
