import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemExpediente } from 'src/app/models/item-expediente.model';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({ 
  selector: 'app-item-expediente',
  templateUrl: './item-expediente.component.html',
  styleUrls: ['./item-expediente.component.css']
})
export class ItemExpedienteComponent implements OnInit {

  public item: ItemExpediente;
  public archivoSubir: File;
  public archivoTemporal: any;
  public cargando: boolean = true;
  

  public formSubmitted = false;
  public itemForm: FormGroup;
  public evaluacionForm: FormGroup;


  public preguntas: any[] = [];
  public autoEvaluacion: any[] = [
    { 
      pregunta: 'Cumplí en tiempo y forma con las actividades encomendadas alcanzando los objetivos.',
      max: 8,
      controlName: '',
    },{ 
      pregunta: 'Mostré liderazgo en las actividades encomendadas.',
      max: 8,
      controlName: '',
    },{ 
      pregunta: 'Organicé mi tiempo y trabajé de manera proactiva.',
      max: 10,
      controlName: '',
    },{ 
      pregunta: 'Interpreté la realidad y me sensibilicé aportando soluciones a la problemática con la actividad complementaria.',
      max: 10,
      controlName: '',
    },{ 
      pregunta: 'Realicé sugerencias innovadoras para beneficio o mejora del programa en el que participa.',
      max: 10,
      controlName: '',
    },{ 
      pregunta: 'Tuve iniciativa para ayudar en las actividades encomendadas y mostré espíritu de servicio.',
      max: 8,
      controlName: '',
    },{ 
      pregunta: '¿Consideras importante la realización del Servicio Social?',
      max: 5,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que las actividades que realizaste son pertinentes a los fines del Servicio Social?',
      max: 8,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que las actividades que realizaste contribuyen a tu formación integral?',
      max: 8,
      controlName: '',
    },{ 
      pregunta: '¿Contribuiste en actividades de beneficio social comunitario?',
      max: 5,
      controlName: '',
    },{ 
      pregunta: '¿Contribuiste en actividades de protección al medio ambiente?',
      max: 5,
      controlName: '',
    },{ 
      pregunta: '¿Cómo consideras que las competencias que adquiriste en la escuela contribuyeron a atender asertivamente las actividades de servicio social?',
      max: 5,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que sería factible continuar con este proyecto de Servicio Social a un proyecto de Residencias Profesionales, proyecto integrador, proyecto de investigación o desarrollo tecnológico?',
      max: 5,
      controlName: '',
    },{ 
      pregunta: '¿Recomendarías a otro estudiante realizar su Servicio Social en la dependencia donde lo realizaste?',
      max: 5,
      controlName: '',
    }
  ]
  public evaluacion: any[] = [
    { 
      pregunta: 'Cumple en tiempo y forma con las actividades encomendadas alcanzando los objetivos',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Trabaja en equipo y se adapta a nuevas situaciones.',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Muestra liderazgo en las actividades encomendadas.',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Organiza su tiempo y trabaja de manera proactiva.',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Interpreta la realidad y sensibiliza aportando soluciones a la problemática con la actividad complementaria.',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Realiza sugerencias innovadoras para beneficio o mejora del programa en el que participa.',
      max: 4,
      controlName: '',
    },{ 
      pregunta: 'Tiene iniciativa para ayudar en las actividades encomendadas y muestra espíritu de servicio.',
      max: 4,
      controlName: '',
    }
  ];
  public evaluacionFinal: any[] = [
    { 
      pregunta: '¿Consideras importante la realización del Servicio Social?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que las actividades que realizaste son pertinentes a los fines del Servicio Social?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que las actividades que realizaste contribuyen a tu formación integral?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Contribuiste en actividades de beneficio social comunitario?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: ' ¿Contribuiste en actividades de protección al medio ambiente?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Cómo consideras que las competencias que adquiriste en la escuela contribuyeron a atender asertivamente las actividades de servicio social?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Consideras que sería factible continuar con este proyecto de Servicio Social a un proyecto de Residencias Profesionales, proyecto integrador, proyecto de investigación o desarrollo tecnológico?',
      max: 4,
      controlName: '',
    },{ 
      pregunta: '¿Recomendarías a otro estudiante realizar su Servicio Social en la dependencia donde lo realizaste?',
      max: 4,
      controlName: '',
    }
  ];


  public generandoArchivo: boolean;

  constructor( private expedienteService: ExpedienteService,
               private activatedRoute: ActivatedRoute,
               private fileUploadService: FileUploadService,
               private fb: FormBuilder, ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ item }) => {
      this.cargarItemExpediente( item );
    });



    this.evaluacionForm = this.fb.group({
    });

    /* this.autoEvaluacion.forEach( (item, index) => {
      const controlName = `calificacion${index+1}` 
      item.controlName = controlName;
      this.evaluacionForm.setControl(item.controlName, new FormControl('', [Validators.required, Validators.max(item.max), Validators.min(1)]))
      console.log(controlName)
    }); */


   


    this.itemForm = this.fb.group({
      descripcion: ['', Validators.required ]
    });




  }


  cargarItemExpediente( id: string ): void {
    this.expedienteService.getItemExpediente( id )
            .subscribe( item => {
              this.cargando = false
              this.item = item

              if ( this.item.isAutoEvaluacion ) {
                this.construirFormEvaluacion( this.autoEvaluacion );
              } else if ( this.item.isEvaluacion ) {
                this.construirFormEvaluacion( this.evaluacion );
              } else if ( this.item.isEvaluacionFinal ) {
                this.construirFormEvaluacion( this.evaluacionFinal );
              }

            })
  }


  generarDocumento(): void {


    let data = {};

    if ( this.item.codigo == 'ITC-VI-PO-002-07' || this.item.codigo == 'ITC-VI-PO-002-08' ) {
      
      this.formSubmitted = true;
      if ( this.itemForm.invalid ) { return; }

      data = this.itemForm.value;
      
    } else if ( this.item.isAutoEvaluacion || this.item.isEvaluacion || this.item.isEvaluacionFinal ) {

      this.formSubmitted = true;
      if ( this.evaluacionForm.invalid ) { return; }

      let calificaciones = [];

      for( const calf in this.evaluacionForm.value ){
        calificaciones.push(this.evaluacionForm.value[calf]);
      }

      data = {
        calificaciones
      }

    }

    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.generandoArchivo = true;

      
        Swal.showLoading();
        
        this.expedienteService.generarArchivo( this.item._id, data )
          .subscribe( item => {

            Swal.fire({
              title: 'Archivo Generado',
              text: `${item.titulo} generado con éxito.`,
              icon: 'success'
            })

            this.item = item;
            
            setTimeout(()=>{
              this.generandoArchivo = false;
            }, 10000)

          }, err => {

            this.generandoArchivo = false;

            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error'
            }) 

          })

      }
    })

  }



  changeArchivo( archivo: File ): void{
    this.archivoSubir = archivo;

    if ( !archivo ) {
      this.archivoSubir = null;
      return;
    }

    // Pasar la foto a base 64
    const reader = new FileReader();
    reader.readAsDataURL( archivo );

    // Mostrar el url
    reader.onloadend = () => {
      this.archivoTemporal = reader.result;
    };

  }

  

  uploadFoto(): void {


    this.fileUploadService.subirArchivo( this.archivoSubir, this.item._id )
        .subscribe( ({item, message}) => {
           this.item = item;
          Swal.fire({
            title: 'Guardado',
            text: message,
            icon: 'success'
          });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          });
        });

  }



  descargarArchivo( archivo: string ): void {

    this.fileUploadService.getArchivo( archivo )
          .subscribe( resp => {
            console.log(resp)
          })

  }



  campoNoValido( form: FormGroup, campo: string ): boolean {

    if ( form.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false; 
    }

  }


  mensajesError(  form: FormGroup, campo: string  ): string {
    return form.get(campo)?.hasError('required') ? `Este campo es requerido.` : 
           form.get(campo)?.hasError('max') ? `No puede ser mayor al valor máximo sugerido.` : 
           form.get(campo)?.hasError('min') ? `No puede ser menor a 0.` : '';
  }



  construirFormEvaluacion( preguntas: any[]  ):void {

    this.preguntas = preguntas;
    this.preguntas.forEach( (item, index) => {
      const controlName = `calificacion${index+1}` 
      item.controlName = controlName;
      this.evaluacionForm.setControl(item.controlName, new FormControl('', [Validators.required, Validators.max(item.max), Validators.min(0)]))
    });

  }


}
