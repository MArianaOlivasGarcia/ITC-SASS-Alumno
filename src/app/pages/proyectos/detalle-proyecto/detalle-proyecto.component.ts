import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public formSubmitted: boolean = false;
  public solicitudForm: FormGroup;

  constructor( public modalService: ModalProyectoService,
               private solicitudService: SolicitudProyectoService,
               private fb: FormBuilder) {
 }

  ngOnInit(): void {

    this.solicitudForm = this.fb.group({
      inicio_servicio: ['', Validators.required],
      termino_servicio: [{value: '', disabled: true}]
    })

  }


  addNuevaSolicitud(solicitud: Solicitud) {
    this.emitirSolicitud.emit(solicitud);
  }


  postular() {

    this.formSubmitted = true;
    if ( this.solicitudForm.invalid ) { return; }

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

        /* const { inicio_servicio, termino } = this.solicitudForm.getRawValue(); */
        /* const solicitud = new Solicitud(this.proyecto, inicio_servicio,) */
        const data = {
          ...this.solicitudForm.getRawValue(),
          proyecto: this.proyecto
        }

        this.solicitudService.createSolicitud(data)
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


  campoNoValido( campo: string ): boolean {


    if ( this.solicitudForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  mensajesError( campo: string  ): string {
    return this.solicitudForm.get(campo)?.hasError('required') ? `Este campo es requerido.` :
           this.solicitudForm.get(campo)?.hasError('noValido') ? `La fecha tiene que ser posterior a hoy.` : '';
  } 


  cambiarFecha( value: any ) {
    let inicioServicio = new Date(value);
    /* let inicioDisponible = new Date(this.proyecto.fecha_inicial); */
    /* if ( inicioServicio.getTime() < inicioDisponible.getTime() ){
      console.log('Es la menor fecha ')
    } */

    if ( inicioServicio.getTime() <= new Date().getTime() ){
        this.solicitudForm.controls.inicio_servicio.setErrors({noValido: true});
    }

    let terminoServicio =  new Date(inicioServicio.setMonth( inicioServicio.getMonth() + 6 ));
    let tDate =terminoServicio.toISOString().substring(0,10);
    this.solicitudForm.controls.termino_servicio.setValue(tDate);
  }


}
