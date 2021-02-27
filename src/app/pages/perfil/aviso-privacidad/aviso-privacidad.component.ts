import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.component.html',
  styleUrls: ['./aviso-privacidad.component.css']
})
export class AvisoPrivacidadComponent implements OnInit {

  @Input() nombre: string;
  @Output() emitirCerrar = new EventEmitter<boolean>();

  constructor( public modalService: ModalService) { }

  ngOnInit(): void {}

  addNuevoCerrar() {
    this.emitirCerrar.emit(true);
  }
  
  cerrarModal(): void {
    this.modalService.cerrarModal();
    this.addNuevoCerrar();
  }

}
