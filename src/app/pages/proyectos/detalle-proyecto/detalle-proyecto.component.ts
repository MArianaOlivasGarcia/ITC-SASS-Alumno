import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalProyectoService } from 'src/app/services/modal-proyecto.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto;
  public usuario: Usuario;

  constructor( public modalService: ModalProyectoService,
               private proyectoService: ProyectoService,
               private authService: AuthService ) { 
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
  }

  seleccionar() {
    this.proyectoService.asignarProyecto( this.proyecto )
          .subscribe( resp => {
            this.usuario.proyecto = resp.alumno.proyecto;
            Swal.fire({
              title: 'Guardado',
              text: 'Proyecto seleccionado con éxito.',
              icon: 'success'
            })
          })
  }

  cerrarModal(): void {
    this.modalService.cerrarModal();
  }

}
