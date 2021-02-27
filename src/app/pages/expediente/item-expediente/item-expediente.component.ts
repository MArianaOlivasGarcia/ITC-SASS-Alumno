import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemExpediente } from 'src/app/models/item-expediente.model';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-item-expediente',
  templateUrl: './item-expediente.component.html',
  styleUrls: ['./item-expediente.component.css']
})
export class ItemExpedienteComponent implements OnInit {

  public item: ItemExpediente;
  public archivoSubir: File;
  public archivoTemporal: any;
  public cargando: boolean = true;

  fileUrl = 'http://localhost:3000/uploads/expedientes/17530051-ITC-VI-PO-002-05.docx';


  constructor( private expedienteService: ExpedienteService,
               private activatedRoute: ActivatedRoute,
               private fileUploadService: FileUploadService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ item }) => {
      this.cargarItemExpediente( item );
    });

  }


  cargarItemExpediente( id: string ): void {
    this.expedienteService.getItemExpediente( id )
            .subscribe( item => {
              console.log(item)
              this.cargando = false
              this.item = item
            })
  }


  generarDocumento(): void {

    this.expedienteService.generarArchivo( this.item._id )
        .subscribe( item => {

          Swal.fire({
            title: 'Archivo Generado',
            text: `${item.titulo} generado con éxito.`,
            icon: 'success'
          })

          this.item = item;
          console.log(item)

        }, err => {

          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          })

        })

  }



  changeArchivo( archivo: File ): void{
    this.archivoSubir = archivo;

    if ( !archivo ) {
      this.archivoSubir = null;
      return;
    }

    // Pasar la foto a base 64
    const reader = new FileReader();
    reader.readAsDataURL( archivo );

    // Mostrar el url
    reader.onloadend = () => {
      this.archivoTemporal = reader.result;
    };

  }

  

  uploadFoto(): void {


    this.fileUploadService.subirArchivo( this.archivoSubir, this.item._id )
        .subscribe( resp => {
          Swal.fire({
            title: 'Guardado',
            text: resp.message,
            icon: 'success'
          });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          });
        });

  }



  descargarArchivo( archivo: string ): void {

    this.fileUploadService.getArchivo( archivo )
          .subscribe( resp => {
            console.log(resp)
          })

  }


}
