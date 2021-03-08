import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia.model';
import { Periodo } from 'src/app/models/periodo.model';
import { Solicitud } from 'src/app/models/solicitud-proyecto.model';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { PeriodoService } from 'src/app/services/periodo.service';
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

  public solicitudForm: FormGroup;
  
  public dependencias: Dependencia[] = [];
  public solicitud: Solicitud;
  public periodo: Periodo; 

  public optionsTipoActividades: {value: string, label: string}[] = [
    { value: 'Administrativas', label: 'Administrativas'},
    { value: 'Asesoria', label: 'Asesoria'},
    { value: 'Docentes', label: 'Docentes'},
    { value: 'Investigación', label: 'Investigación'},
    { value: 'Técnicas', label: 'Técnicas'},
    { value: 'Otro', label: 'Otro'},
  ];

  constructor( private fb: FormBuilder,
               private proyectoService: ProyectoService,
               private periodoService: PeriodoService,
               private dependenciaService: DependenciaService,
               private solicitudService: SolicitudProyectoService,               
               private router: Router,
               private activatedRoute: ActivatedRoute  ) {
 }


  ngOnInit(): void {

    this.cargarPeriodoProximo();
    this.cargarDependencias();

    this.activatedRoute.params.subscribe( ({ tool }) => {
      if( tool == 'editar') {
        this.cargarSolicitud();
      }
    });

    this.solicitudForm = this.fb.group({
      actividades: ['', Validators.required ],
      apoyo_economico: [false, Validators.required ],
      dependencia: ['', Validators.required ],
      email_responsable: ['', Validators.required ],
      horario: ['', Validators.required ],
      instalacion: [false,  Validators.required],
      lugar_desempeno: ['', Validators.required ],
      modalidad: ['', Validators.required ],
      nombre: ['', Validators.required ],
      objetivo: ['', Validators.required ],
      puesto_responsable: ['', Validators.required ],
      responsable: ['', Validators.required ],
      telefono_responsable: ['', Validators.required ],
      tipo: ['', Validators.required ],
      tipo_actividades: ['', Validators.required ],
      inicio_servicio: ['', Validators.required ],
      termino_servicio: [{value: '', disabled: true}]
    });


    
  }

  cargarDependencias(): void {
    this.dependenciaService.getDependencias()
          .subscribe( dependencias => {
            this.dependencias = dependencias;
            }
          );
  } 


  cargarPeriodoProximo(): void{
    this.periodoService.getPeriodoProximo()
        .subscribe( periodo => {
          this.periodo = periodo;
        })
  }


  cargarSolicitud(): void{

      this.solicitudService.getSolicitudAndProyectoPersonal()
          .subscribe( solicitud => {  

          const { proyecto: { 
                    apoyo_economico,
                    instalacion,
                    nombre,
                    dependencia: { _id },
                    objetivo,
                    actividades,
                    lugar_desempeno,
                    modalidad,
                    horario,
                    tipo,
                    tipo_actividades,
                    responsable,
                    puesto_responsable,
                    telefono_responsable,
                    email_responsable },
                  inicio_servicio,
                  termino_servicio } = solicitud;

          this.solicitud = solicitud;
          
          let existe = false;
          this.optionsTipoActividades.forEach((opt: {value: string, label: string}) => {
            if( tipo_actividades === opt.value ){
              existe = true;
            }
          })

          if ( !existe ) {
            this.solicitudForm.addControl('otro', new FormControl('', Validators.required));
            this.solicitudForm.setValue({ apoyo_economico,
              instalacion,
              nombre,
              dependencia: _id,
              objetivo,
              actividades,
              tipo_actividades: 'Otro',
              lugar_desempeno,
              modalidad,
              horario,
              tipo,
              otro: tipo_actividades,
              responsable,
              puesto_responsable,
              inicio_servicio,
              termino_servicio,
              telefono_responsable,
              email_responsable});
          } else {
            this.solicitudForm.setValue({ apoyo_economico,
              instalacion,
              nombre,
              dependencia: _id,
              objetivo,
              actividades,
              tipo_actividades,
              lugar_desempeno,
              modalidad,
              horario,
              tipo,
              responsable,
              puesto_responsable,
              inicio_servicio,
              termino_servicio,
              telefono_responsable,
              email_responsable});
          }
        });

  }


  guardar(): void {

    this.formSubmitted = true;
    if ( this.solicitudForm.invalid ) { return; }

    const { nombre } = this.solicitudForm.value;

    if ( this.solicitudForm.get('otro') ) {
      this.solicitudForm.get('tipo_actividades').setValue(this.solicitudForm.get('otro').value)
      this.solicitudForm.removeControl('otro');
    }
    console.log(this.solicitudForm.value)


    if ( this.solicitud ) {
      
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
          const { inicio_servicio, termino_servicio, ...proyecto } = this.solicitudForm.getRawValue();

          const data = {
            _id: this.solicitud.proyecto._id,
            ...proyecto
          };
        
          const solicitud = new Solicitud( data, inicio_servicio, termino_servicio )
          
          this.proyectoService.actualizarProyecto( solicitud )
          .subscribe( () => {
            Swal.fire({
              title: 'Guardado',
              text: `Proyecto ${nombre} actualizado con éxito.`,
              icon: 'success'
            });
            this.router.navigateByUrl('/dashboard/proyecto-personal');
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

        const { inicio_servicio, termino_servicio, ...proyecto } = this.solicitudForm.getRawValue();

        const solicitud = new Solicitud(
          proyecto,
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


    if ( this.solicitudForm.get(campo)?.invalid  && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  mensajesError( campo: string  ): string {
    return this.solicitudForm.get(campo)?.hasError('required') ? `Este campo es requerido.` : 
           this.solicitudForm.get(campo)?.hasError('isMenor') ? `Esta fecha tiene que ser posterior ó igual a la fecha de inicio del periodo(${ formatDate( this.periodo.fecha_inicio, 'dd/MM/YYYY','es-mx') }).` :
           this.solicitudForm.get(campo)?.hasError('isMayor') ? `Esta fecha tiene que ser menor ó igual a la fecha de termino del periodo(${ formatDate( this.periodo.fecha_termino, 'dd/MM/YYYY','es-mx') }).` : '';
  }


  cambiarFecha( value: any ) {
    let inicioServicio = new Date(value);

   if ( inicioServicio.getTime() < new Date(this.periodo.fecha_inicio).getTime() ){
      this.solicitudForm.controls.inicio_servicio.setErrors({isMenor: true});
    } else if ( inicioServicio.getTime() > new Date(this.periodo.fecha_termino).getTime() ){
      this.solicitudForm.controls.inicio_servicio.setErrors({isMayor: true});
    } 
 
    let terminoServicio =  new Date(inicioServicio.setMonth( inicioServicio.getMonth() + 6 ));
    let tDate =terminoServicio.toISOString().substring(0,10);
    this.solicitudForm.controls.termino_servicio.setValue(tDate);
  }



  cambioTipoActividad( value: string ): void {
    
    if ( value !== 'Otro') {
      this.solicitudForm.removeControl('otro');
    } else {
      this.solicitudForm.addControl('otro', new FormControl('', Validators.required));
    }
    
  }



}
