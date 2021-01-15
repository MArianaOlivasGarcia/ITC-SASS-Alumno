import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

/*   public usuario: Usuario;
 */
  constructor( private authService: AuthService,
               private expedienteService: ExpedienteService ) {
/*     this.usuario = this.authService.usuario;
 */   }

  ngOnInit(): void { 

  }


  abrirExpediente(): void {


    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire('Espere por favor...')
        Swal.showLoading()
        
        this.expedienteService.abrirExpediente()
              .subscribe( expediente => {
            /* 
          this.usuario.expediente = expediente; */
          Swal.fire({
              title: '¡Felicidades!',
              text: 'La apertura de tu expediente se realizo con éxito.',
              icon: 'success'
            }) 
        
        });
      }
    
    })
    
  }


}
