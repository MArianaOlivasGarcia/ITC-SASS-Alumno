import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-solicitud-servicio-social',
  templateUrl: './solicitud-servicio-social.component.html',
  styles: [
  ]
})
export class SolicitudServicioSocialComponent implements OnInit {

  usuario: Usuario;

  constructor( private authService: AuthService ) { 
    this.usuario = this.authService.usuario;   
  }

  ngOnInit(): void {
  }

}
