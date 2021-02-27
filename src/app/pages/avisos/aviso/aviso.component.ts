import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/models/aviso.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html', 
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  @Input() aviso: Aviso;

  constructor( public modalService: ModalService ) { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.modalService.cerrarModal();
  }

}
