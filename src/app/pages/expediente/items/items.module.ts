import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudServicioSocialComponent } from './solicitud-servicio-social/solicitud-servicio-social.component';
import { CartaAsignacionComponent } from './carta-asignacion/carta-asignacion.component';
import { CartaCompromisoComponent } from './carta-compromiso/carta-compromiso.component';
import { PlanTrabajoComponent } from './plan-trabajo/plan-trabajo.component';
import { AceptacionComponent } from './aceptacion/aceptacion.component';
import { PresentacionComponent } from './presentacion/presentacion.component';

@NgModule({
  declarations: [
    SolicitudServicioSocialComponent,
    CartaAsignacionComponent,
    CartaCompromisoComponent,
    PlanTrabajoComponent,
    PresentacionComponent,
    AceptacionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SolicitudServicioSocialComponent,
    CartaAsignacionComponent,
    CartaCompromisoComponent,
    PlanTrabajoComponent,
    PresentacionComponent,
    AceptacionComponent
  ]
})
export class ItemsModule { }
