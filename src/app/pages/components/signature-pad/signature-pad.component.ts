import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import SignaturePad from 'signature_pad';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styles: [
  ]
})
export class SignaturePadComponent implements OnInit, AfterViewInit {

  @ViewChild('sPad', {static: true}) signaturePadElement;
  signaturePad: any;

  usuario: Usuario;

  constructor( private uploadService: FileUploadService,
               private authService: AuthService ) {
    this.usuario = this.authService.usuario;
   }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement)
  }

  undo(): void {
    const data = this.signaturePad.toData();
    if ( data ) {
      data.pop(); 
      this.signaturePad.fromData(data);
    }
  }

  limpiar(): void {
    this.signaturePad.clear();
  }


  guardar(): void{
    // Obtengo Base64
    const dataURL = this.signaturePad.toDataURL();
    const imageName = 'firma.png';
    const imageBlob = this.dataURLtoBlob(dataURL);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    
    this.uploadService.actualizarFirma( imageFile, this.usuario._id )
        .subscribe( resp => {
          this.signaturePad.clear();
          this.usuario.firma = resp.nombreFoto;
          Swal.fire({
            title: 'Guardado',
            text: 'Firma actualizada con éxito',
            icon: 'success'
          })
        })

  }



  dataURLtoBlob( dataURL ): Blob {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLenght = raw.length;
    const uInt8Array = new Uint8Array(rawLenght);
    for ( let i = 0; i < rawLenght; i ++ ) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });  
  }

}
