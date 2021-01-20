import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Programa } from 'src/app/models/programa.model';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ProgramaService } from 'src/app/services/programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  
  public formSubmitted: boolean = false; 
  public programaForm: FormGroup;
  public programa: Programa;

  public hasPrograma: boolean = true;
  @Output() emitirHasPrograma = new EventEmitter<boolean>();


  constructor( private fb: FormBuilder,
               private programaService: ProgramaService,
               private expedienteService: ExpedienteService ) { }

  ngOnInit(): void {
    this.cargarPrograma()

    this.programaForm = this.fb.group({
      fecha_inicio: ['', Validators.required ],
      fecha_termino: ['', Validators.required ]
    });
  }

  addNuevoHasPrograma( hasPrograma: boolean) {
    this.emitirHasPrograma.emit(hasPrograma);
  }


  cargarPrograma(): void {
    this.programaService.getByAlumno()
          .subscribe( programa => {
            if( !programa ) {
              this.hasPrograma = false;
            } 
            this.programa = programa;
            this.addNuevoHasPrograma(this.hasPrograma)
          })
  }


  guardar(){

    this.formSubmitted = true;
    if ( this.programaForm.invalid ) { return; }


    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.programaService.crearPrograma( this.programaForm.value )
          .subscribe( programa => {
            this.programa = programa;

            this.expedienteService.crearExpediente()
              .subscribe( resp => {
                Swal.fire({
                  title: 'Guardado',
                  text: 'Expediente creado con éxito',
                  icon: 'success'
                })

                this.hasPrograma = true;
                this.addNuevoHasPrograma( this.hasPrograma )
                
              }, err => {
                Swal.fire({
                  title: 'Error',
                  text: err.error.message,
                  icon: 'error'
                })
              })

          }, err => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error'
            })
          })

      }
    })
  
  
   }



   abrirExpediente(): void {
      this.expedienteService.crearExpediente()
        .subscribe( resp => {
          Swal.fire({
            title: 'Guardado',
            text: 'Expediente creado con éxito',
            icon: 'success'
          })
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          })
        })
  }



  
   campoNoValido( campo: string ): boolean {


    if ( this.programaForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  
  }
  
  
  mensajesError( campo: string  ): string {
    return this.programaForm.get(campo)?.hasError('required') ? `Este campo es requerido.` : '';
  }

  
}
