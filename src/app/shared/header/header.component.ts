import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private authService: AuthService,
               private sidebarService: SidebarService ) {
    this.usuario = this.authService.usuario;
  }

  logout(): void {
    this.authService.logout();
  }

  abrirSidebar(): void {
    if ( this.sidebarService.ocultarSidebar ){
      this.sidebarService.abrirSidebar();
    } else {
      this.sidebarService.cerrarSidebar();
    }
  }

}
