import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemExpediente } from '../models/item-expediente.model';
import { AvisoComponent } from './avisos/aviso/aviso.component';
import { AvisosComponent } from './avisos/avisos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { ItemExpedienteComponent } from './expediente/item-expediente/item-expediente.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectoComponent } from './proyectos/proyecto/proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { SolicitudComponent } from './proyectos/solicitud/solicitud.component';

const routes: Routes = [
    { path: 'perfil',       component: PerfilComponent,       data: { titulo: 'Mi Perfil' } },
    { path: 'proyecto/:id', component: ProyectoComponent,     data: { titulo: 'Proyecto' } },
    { path: 'proyectos',    component: ProyectosComponent,    data: { titulo: 'Banco de Proyectos' } },
    { path: 'expediente',   component: ExpedienteComponent,   data: { titulo: 'Mi Expediente' } },
    { path: 'expediente/:codigo/:item',   component: ItemExpedienteComponent,   data: { titulo: 'Mi Expediente' } },
    { path: 'mensajes',     component: MensajesComponent,     data: { titulo: 'Mensajes' } },
    { path: 'chat/:id',     component: MensajeComponent,      data: { titulo: 'Chat' } },
    { path: 'avisos',       component: AvisosComponent,       data: { titulo: 'Avisos' } },
    { path: 'aviso/:id',    component: AvisoComponent,        data: { titulo: 'Aviso' } },
    { path: 'solicitud/:id', component: SolicitudComponent,        data: { titulo: 'Solicitud' } },
    { path: '',             component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
