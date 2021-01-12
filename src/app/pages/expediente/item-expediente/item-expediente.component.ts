import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemExpediente } from 'src/app/models/item-expediente.model';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({ 
  selector: 'app-item-expediente',
  templateUrl: './item-expediente.component.html',
  styleUrls: ['./item-expediente.component.css']
})
export class ItemExpedienteComponent implements OnInit {

  public item: ItemExpediente;

  constructor( private expedienteService: ExpedienteService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ item }) => {
      this.cargarItemExpediente( item );
    });

  }


  cargarItemExpediente( id: string ): void {
    this.expedienteService.getItemExpediente( id )
            .subscribe( item => this.item = item )
  }


  

}
