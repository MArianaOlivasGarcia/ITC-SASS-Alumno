import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Aviso } from 'src/app/models/aviso.model';
import { AvisoService } from 'src/app/services/aviso.service';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

  
  public totalAvisos = 0;
  public avisos: Aviso[] = [];
  public avisosTemp: Aviso[] = [];
  public desde = 0;
  public cargando = true;

  public avisoSeleccionado: Aviso;


  constructor( private avisoService: AvisoService,
               private modalService: ModalService,
               private busquedaService: BusquedaService ) { }

  ngOnInit(): void {
    this.cargarAvisos();
  }


  cargarAvisos(): void {

    this.cargando = true; 

    this.avisoService.getAvisosPaginados( this.desde )
        .subscribe( ({ total, avisos }) => {
          this.totalAvisos = total;
          this.avisos = avisos;
          this.avisosTemp = avisos;
          this.cargando = false;
        });

  }

  cambiarPagina( valor: number ): void {

    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalAvisos ) {
      this.desde -= valor;
    }

    this.cargarAvisos();

  }


  buscar( termino: string ): void {

    if ( termino.length === 0 ) {
      this.avisos = this.avisosTemp;
      return;
    }

    this.busquedaService.busqueda( 'avisos', termino )
        .subscribe( resp => this.avisos = resp );

  }


  abrirModal( aviso: Aviso ): void {
    this.avisoSeleccionado = aviso;
    this.modalService.abrirModal()
  }


}
