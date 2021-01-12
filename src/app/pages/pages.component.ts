import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor( private webSocketService: WebSocketService,
    public sidebarService: SidebarService ) { }

  ngOnInit(): void {
    this.sidebarService.cargarMenu();
  }

}
