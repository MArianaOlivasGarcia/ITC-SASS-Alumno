import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  public usuario: Usuario;
  public expediente: Expediente;

  constructor( private authService: AuthService,
               private expedienteService: ExpedienteService ) {
    this.usuario = this.authService.usuario;
   }

  ngOnInit(): void {  
    this.cargarExpediente();
  }


  cargarExpediente(): void {
    this.expedienteService.getExpediente()
        .subscribe( expediente => {
          this.expediente = expediente;
        });
  }

}
