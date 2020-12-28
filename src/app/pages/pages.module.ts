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
    MensajeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class PagesModule { }
