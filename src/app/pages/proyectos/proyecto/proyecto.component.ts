import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
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
  public dependencias: Dependencia[] = [];
  public proyectoSeleccionado: Proyecto; 

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
      periodo: ['', Validators.required ],
      lugar_desempeno: ['', Validators.required ],
      modalidad: ['', Validators.required ],
      tipo: ['', Validators.required ],
      horario: ['', Validators.required ],
      apoyo_economico: [false, Validators.required ],
      responsable: ['', Validators.required ],
      puesto_responsable: ['', Validators.required ]
    });
  }

  cargarDependencias(): void {
    this.dependenciaService.getDependencias()
          .subscribe( resp => {
            this.dependencias = resp.dependencias;
            }
          );
  }


  cargarProyecto( id: string ): void{

    if ( id === 'nuevo' ) { return; }

    this.proyectoService.getProyecto( id )
        .subscribe( proyecto => {
          // TODO: SI NO ENCUENTRA EL PROYECTO O EL ENLACE ES INVENTADO
          //  return this.router.navigateByUrl(`/dashboard/proyectos`);

          const { apoyo_economico,
                  nombre,
                  dependencia: { _id },
                  objetivo,
                  actividades,
                  periodo,
                  lugar_desempeno,
                  modalidad,
                  horario,
                  tipo,
                  responsable,
                  puesto_responsable } = proyecto;
          this.proyectoSeleccionado = proyecto;
          this.proyectoForm.setValue({ apoyo_economico,
                                       nombre,
                                       dependencia: _id,
                                       objetivo,
                                       actividades,
                                       periodo,
                                       lugar_desempeno,
                                       modalidad,
                                       horario,
                                       tipo,
                                       responsable,
                                       puesto_responsable});

        });

  }


  guardar(): void {
    this.formSubmitted = true;
    if ( this.proyectoForm.invalid ) { return; }

    const { nombre } = this.proyectoForm.value;

    if ( this.proyectoSeleccionado ) {
      // Actualizar
      const data = {
        ... this.proyectoForm.value,
        _id: this.proyectoSeleccionado._id,
      };

      this.proyectoService.actualizarProyecto( data )
          .subscribe( resp => {
            Swal.fire({
              title: 'Guardado',
              text: `Proyecto ${nombre} actualizado con éxito.`,
              icon: 'success'
            });
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

        if (result.isConfirmed) {
          this.proyectoService.crearProyecto(this.proyectoForm.value)
                .subscribe( ({proyecto}) => {
                  Swal.fire({
                    title: 'Guardado',
                    text: 'Tu proyecto ha sido creado y enviado a revision con éxito.',
                    icon: 'success'
                  })
                this.router.navigateByUrl(`/dashboard/proyecto/${proyecto._id}`);
                })
  
        }
      });
      
    }
  }


  campoNoValido( campo: string ): boolean {


    if ( this.proyectoForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  mensajesError( campo: string  ): string {
    return this.proyectoForm.get(campo)?.hasError('required') ? `Este campo es requerido.` : '';
  }


}
