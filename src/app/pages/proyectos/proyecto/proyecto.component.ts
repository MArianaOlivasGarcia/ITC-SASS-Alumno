import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependencia } from 'src/app/models/dependencia.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
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
  public usuario: Usuario;

  
  constructor( private fb: FormBuilder,
               private proyectoService: ProyectoService,
               private dependenciaService: DependenciaService,
               private authService: AuthService,
               private router: Router,
               private activatedRoute: ActivatedRoute  ) {
  this.usuario = this.authService.usuario;
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
      lugar: ['', Validators.required ],
      modalidad: ['', Validators.required ],
      tipo: ['', Validators.required ],
      horario: ['', Validators.required ],
      /*apoyo_economico: ['', Validators.required ],*/
      responsable: ['', Validators.required ]
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
                  lugar,
                  modalidad,
                  horario,
                  tipo,
                  responsable } = proyecto;
          this.proyectoSeleccionado = proyecto;
          this.proyectoForm.setValue({ /* apoyo_economico, */
                                       nombre,
                                       dependencia: _id,
                                       objetivo,
                                       actividades,
                                       periodo,
                                       lugar,
                                       modalidad,
                                       horario,
                                       tipo,
                                       responsable});

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
          .subscribe( () => {
            Swal.fire({
              title: 'Guardado',
              text: `Proyecto ${nombre} actualizado con éxito.`,
              icon: 'success'
            });
          });

    } else {
      // CREAR PROYECTO

      this.proyectoService.crearProyecto( this.proyectoForm.value )
      .subscribe( resp => {
        Swal.fire({
          title: 'Creado',
          text: `Tu proyecto ha sido creado con éxito.`,
          icon: 'success'
        });
        this.router.navigateByUrl(`/dashboard/proyecto/${resp.proyecto._id}`);
        }, err => {
          Swal.fire({
            title: 'No se pudo crear el proyecto.',
            text:  err.error.message,
            icon: 'error'
          });
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
