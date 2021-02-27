import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const public_url = environment.public_url;

@Pipe({
  name: 'archivo'
})
export class ArchivoPipe implements PipeTransform {

  constructor( private authService: AuthService ){}

  transform(archivo: string): string {
    
    
    /* if ( !imagen ) {
      return `${ public_url }/upload/no-image/no-image`;
    } else { */
      return `${ public_url }/${this.authService.usuario.numero_control}/${archivo}`;
    /* }
 */
  }

}
