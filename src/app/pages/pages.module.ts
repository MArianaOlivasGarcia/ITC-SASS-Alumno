import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ExpedientePageComponent } from './expediente/expediente-page.component';
import { ItemExpedienteComponent } from './expediente/item-expediente/item-expediente.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyecto-personal/proyecto/proyecto.component';
import { ProyectoPersonalComponent } from './proyecto-personal/proyecto-personal.component';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoComponent } from './avisos/aviso/aviso.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';
import { DetalleProyectoComponent } from './proyectos/detalle-proyecto/detalle-proyecto.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { UploadFileComponent } from './components/expediente/upload-file/upload-file.component';
import { SolicitudComponent } from './proyectos/solicitud/solicitud.component';
import { ExpedienteComponent } from './expediente/expediente/expediente.component';
import { AvisoPrivacidadComponent } from './perfil/aviso-privacidad/aviso-privacidad.component';
import { DependenciasComponent } from './dependencias/dependencias.component';
import { DetalleDependenciaComponent } from './dependencias/detalle-dependencia/detalle-dependencia.component';

import { ImagenPipe } from '../pipes/imagen.pipe';

import { environment } from '../../environments/environment';

// SOCKETS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ArchivoPipe } from '../pipes/archivo.pipe';

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
    ImagenPipe,
    ArchivoPipe,
    DashboardComponent,
    ExpedientePageComponent,
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
    SolicitudComponent,
    ExpedienteComponent,
    ProyectoPersonalComponent,
    AvisoPrivacidadComponent,
    DependenciasComponent,
    DetalleDependenciaComponent ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NgxExtendedPdfViewerModule
  ],
  exports: []
})
export class PagesModule { }
 