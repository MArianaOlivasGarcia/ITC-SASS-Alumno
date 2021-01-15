import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { ItemExpedienteComponent } from './expediente/item-expediente/item-expediente.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyectos/proyecto/proyecto.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AvisosComponent } from './avisos/avisos.component';
import { AvisoComponent } from './avisos/aviso/aviso.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';
import { DetalleProyectoComponent } from './proyectos/detalle-proyecto/detalle-proyecto.component';

import { environment } from '../../environments/environment';

// SOCKETS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { UploadFileComponent } from './components/expediente/upload-file/upload-file.component';
import { SolicitudComponent } from './proyectos/solicitud/solicitud.component';


const token = localStorage.getItem('accessToken') || '';

const config: SocketIoConfig = {
  url: environment.ws_url, options: {
    transports: ['websocket'],
    query: {
      Authorization: `Bearer ${token}`
    } 
  }
};

@NgModule({
  declarations: [
    DashboardComponent,
    ExpedienteComponent,
    ItemExpedienteComponent,
    PagesComponent,
    PerfilComponent,
    ProyectosComponent,
    ProyectoComponent,
    AvisosComponent,
    AvisoComponent,
    MensajesComponent,
    MensajeComponent,
    DetalleProyectoComponent,
    SignaturePadComponent,
    UploadFileComponent,
    SolicitudComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  exports: []
})
export class PagesModule { }
