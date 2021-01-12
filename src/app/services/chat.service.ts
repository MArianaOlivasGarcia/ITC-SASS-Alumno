import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private wsService: WebSocketService ) { }


  sendMessage( mensaje: string ) {

    const payload = {
      de: 'ANGULAR APP ALUMNO',
      cuerpo: 'Hola desde angular'
    };

    this.wsService.emit( 'mensaje' , payload );

  }

}
