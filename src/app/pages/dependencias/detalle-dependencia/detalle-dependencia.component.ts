import { Component, Input, OnInit } from '@angular/core';
import { Dependencia } from 'src/app/models/dependencia.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-detalle-dependencia',
  templateUrl: './detalle-dependencia.component.html',
  styleUrls: ['./detalle-dependencia.component.css']
})
export class DetalleDependenciaComponent implements OnInit {


  @Input() dependencia: Dependencia;
  
  constructor( public modalService: ModalService ) { }

  ngOnInit(): void {
  }


  cerrarModal(): void {
    this.modalService.cerrarModal();
  }

}
