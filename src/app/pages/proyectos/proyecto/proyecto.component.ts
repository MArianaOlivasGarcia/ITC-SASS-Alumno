import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { SolicitudProyectoService } from 'src/app/services/solicitud-proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  public formSubmitted = false;

  public proyectoForm: FormGroup;
  public solicitudForm: FormGroup;

  public dependencias: Dependencia[] = [];
  public solicitud: Solicitud; 

  constructor( private fb: FormBuilder,
               private proyectoService: ProyectoService,
               private dependenciaService: DependenciaService,
               private solicitudService: SolicitudProyectoService,               
               private router: Router,
               private activatedRoute: ActivatedRoute  ) {
 }


  ngOnInit(): void {

    this.cargarDependencias();

    this.activatedRoute.params.subscribe( ({ id }) => {
      this.cargarProyecto( id );
    });

    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required ],
      dependencia: ['', Validators.required ],
      objetivo: ['', Validators.required ],
      actividades: ['', Validators.required ],
      lugar_desempeno: ['', Validators.required ],
      modalidad: [{value:'Público', disabled: true}],
      tipo: ['', Validators.required ],
      horario: ['', Validators.required ],
      apoyo_economico: [false, Validators.required ],
      responsable: ['', Validators.required ],
      puesto_responsable: ['', Validators.required ],

    });

    this.solicitudForm = this.fb.group({
      inicio_servicio: ['', Validators.required ],
      termino_servicio: [{value: '', disabled: true}]
    })

    
  }

  cargarDependencias(): void {
    this.dependenciaService.getDependencias()
          .subscribe( dependencias => {
            this.dependencias = dependencias;
            }
          );
  } 


  cargarProyecto( id: string ): void{

    if ( id === 'nuevo' ) { return; }

    this.solicitudService.getById( id )
        .subscribe( solicitud => {
          // TODO: SI NO ENCUENTRA EL PROYECTO O EL ENLACE ES INVENTADO
          //  return this.router.navigateByUrl(`/dashboard/proyectos`);

          const { apoyo_economico,
                  nombre,
                  dependencia: { _id },
                  objetivo,
                  actividades,
                  lugar_desempeno,
                  modalidad,
                  horario,
                  tipo,
                  responsable,
                  puesto_responsable } = solicitud.proyecto;
          const { inicio_servicio,
                  termino_servicio } = solicitud

          this.solicitud = solicitud;

          this.proyectoForm.setValue({ apoyo_economico,
                                       nombre,
                                       dependencia: _id,
                                       objetivo,
                                       actividades,
                                       lugar_desempeno,
                                       modalidad,
                                       horario,
                                       tipo,
                                       responsable,
                                       puesto_responsable});
          this.solicitudForm.setValue({ inicio_servicio,
                                        termino_servicio })

        });

  }


  guardar(): void {

    this.formSubmitted = true;
    if ( this.proyectoForm.invalid || this.solicitudForm.invalid ) { return; }

    const { nombre } = this.proyectoForm.value;

    if ( this.solicitud.proyecto ) {
      
      Swal.fire({
        title: '¿Estas seguro?',
        text: 'Se volvera a enviar tu solicitud para este proyecto ya actualizado.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO'
      }).then((result) => {

        if (result.isConfirmed) {

          // Actualizar
          const proyecto = {
            ... this.proyectoForm.value,
            _id: this.solicitud.proyecto._id,
          };
        
          const { inicio_servicio, termino_servicio } = this.solicitudForm.getRawValue()
        
          const solicitud = new Solicitud( proyecto, inicio_servicio, termino_servicio )
          
          this.proyectoService.actualizarProyecto( solicitud )
          .subscribe( () => {
            Swal.fire({
              title: 'Guardado',
              text: `Proyecto ${nombre} actualizado con éxito.`,
              icon: 'success'
            });
          }, err => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error'
            })
          });
  
        }
      });


    } else {
      // CREAR PROYECTO

      Swal.fire({
        title: '¿Estas seguro?',
        text: 'Al crear el proyecto no podrás seleccionar uno disponible en el Banco de Proyectos',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO'
      }).then((result) => {

        const { inicio_servicio, termino_servicio } = this.solicitudForm.getRawValue()

        const solicitud = new Solicitud(
          this.proyectoForm.value,
          inicio_servicio,
          termino_servicio
        );

        if (result.isConfirmed) {
          this.proyectoService.crearProyecto(solicitud)
                .subscribe( () => {
                  Swal.fire({
                    title: 'Guardado',
                    text: 'Tu proyecto ha sido creado y enviado a revision con éxito.',
                    icon: 'success'
                  })
                this.router.navigateByUrl(`/dashboard/proyectos`);
                }, err => {
                  Swal.fire({
                    title: 'Error',
                    text: err.error.message,
                    icon: 'error'
                  })
                })
  
        }
      });
      
    }
  }


  campoNoValido( campo: string ): boolean {


    if ( (this.proyectoForm.get(campo)?.invalid || this.solicitudForm.get(campo)?.invalid) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  mensajesError( campo: string  ): string {
    return this.proyectoForm.get(campo)?.hasError('required') ? `Este campo es requerido.` : 
           this.solicitudForm.get(campo)?.hasError('required') ? `Este campo es requerido.` : 
           this.solicitudForm.get(campo)?.hasError('noValido') ? `La fecha debe ser posterior a hoy.` : '';
  }


  cambiarFecha( value: any ) {
    let inicioServicio = new Date(value);
    /* let inicioDisponible = new Date(this.proyecto.fecha_inicial); */
    /* if ( inicioServicio.getTime() < inicioDisponible.getTime() ){
      console.log('Es la menor fecha ')
    } */

    if ( inicioServicio.getTime() <= new Date().getTime() ){
        this.solicitudForm.controls.inicio_servicio.setErrors({noValido: true});
    }

    let terminoServicio =  new Date(inicioServicio.setMonth( inicioServicio.getMonth() + 6 ));
    let tDate =terminoServicio.toISOString().substring(0,10);
    this.solicitudForm.controls.termino_servicio.setValue(tDate);
  }


}
