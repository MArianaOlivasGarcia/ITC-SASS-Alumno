import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvisoComponent } from './avisos/aviso/aviso.component';
import { AvisosComponent } from './avisos/avisos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DependenciasComponent } from './dependencias/dependencias.component';
import { ExpedientePageComponent } from './expediente/expediente-page.component';
import { ItemExpedienteComponent } from './expediente/item-expediente/item-expediente.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { ProyectoPersonalComponent } from './proyecto-personal/proyecto-personal.component';
import { ProyectoComponent } from './proyecto-personal/proyecto/proyecto.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { SolicitudComponent } from './proyectos/solicitud/solicitud.component';

const routes: Routes = [
    { path: 'perfil',            component: PerfilComponent,           data: { titulo: 'Mi Perfil' } },
    { path: 'proyecto/:tool',    component: ProyectoComponent,         data: { titulo: 'Proyecto Personal' } },
    { path: 'proyecto-personal', component: ProyectoPersonalComponent, data: { titulo: 'Proyecto Personal' } },
    { path: 'dependencias',      component: DependenciasComponent,     data: { titulo: 'Banco de convenios vigentes' } },
    { path: 'proyectos',         component: ProyectosComponent,        data: { titulo: 'Banco de Proyectos' } },
    { path: 'expediente',        component: ExpedientePageComponent,   data: { titulo: 'Mi Expediente' } },
    { path: 'expediente/:item',  component: ItemExpedienteComponent,   data: { titulo: 'Mi Expediente' } },
    { path: 'mensajes',          component: MensajesComponent,         data: { titulo: 'Mensajes' } },
    { path: 'chat/:id',          component: MensajeComponent,          data: { titulo: 'Chat' } },
    { path: 'avisos',            component: AvisosComponent,           data: { titulo: 'Avisos' } },
    { path: 'solicitud/:id',     component: SolicitudComponent,        data: { titulo: 'Solicitud' } },
    { path: '',                  component: DashboardComponent,        data: { titulo: 'Dashboard' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class ChildRoutingModule { }
