import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const public_url = environment.public_url;

@Pipe({
  name: 'archivo'
})
export class ArchivoPipe implements PipeTransform {

  constructor( private authService: AuthService ){}

  transform(archivo: string, carpeta?: string  ): string {
    
    if ( carpeta ) {
      return `${ public_url }/${carpeta}/${archivo}`;
    } else {
      return `${ public_url }/${this.authService.usuario.numero_control}/${archivo}`;
    }

  }

}
