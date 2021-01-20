import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  public expediente: Expediente;
  public cargando: boolean = true;

  constructor( private expedienteService: ExpedienteService ) { }

  ngOnInit(): void {
    this.cargarExpediente();
  }

  cargarExpediente(): void {
    this.expedienteService.getExpedienteByAlumno()
          .subscribe( expediente => {
            this.expediente = expediente;
            this.cargando = false;
            console.log(this.expediente);
          })
  }


}
