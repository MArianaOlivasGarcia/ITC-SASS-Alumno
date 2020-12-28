import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public formSubmitted = false;
  public formSubmitted2 = false;

  public usuarioForm: FormGroup;
  public changePasswordForm: FormGroup;

  public usuario: Usuario;
  public fotoSubir: File;
  public fotoTemporal: any;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required ],
      apellido_paterno: [this.usuario.apellido_paterno, Validators.required ],
      apellido_materno: [this.usuario.apellido_materno, Validators.required ],
      sexo: [this.usuario.sexo, Validators.required ],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, Validators.required ],
      domicilio: [this.usuario.domicilio, Validators.required ],
      telefono: [this.usuario.telefono, Validators.required ],
      email: [this.usuario.email, Validators.required ],
      numero_seguro: [this.usuario.numero_seguro, Validators.required ],
      numero_control: [this.usuario.numero_control, Validators.required ],
      carrera: [this.usuario.carrera.nombre, [Validators.required ] ],
      semestre: [this.usuario.semestre, [Validators.required ] ],
      creditos_acumulados: [this.usuario.creditos_acumulados, [Validators.required ] ],
      terminos: [ this.usuario.terminos , [ Validators.requiredTrue ] ],
    });


    // tslint:disable: deprecation
    this.changePasswordForm = this.fb.group({
      old_password:  ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, {
      validators: this.passwordsIguales('new_password' , 'confirm_password')
    });

  }


  guardar(): void {

    this.formSubmitted = true;
    this.formSubmitted2 = false;
    if ( this.usuarioForm.invalid ) { return; }

    const data = {
      ... this.usuarioForm.value,
      _id: this.usuario._id,
      carrera: this.usuario.carrera
    };

    this.usuarioService.actualizarUsuario( data )
      .subscribe( () => {

        const { domicilio, telefono, email, numero_seguro } = this.usuarioForm.value;

        this.usuario.domicilio = domicilio;
        this.usuario.telefono = telefono;
        this.usuario.email = email;
        this.usuario.numero_seguro = numero_seguro;

        Swal.fire({
          title: 'Guardado',
          text: `Tu perfil ha sido actualizado con éxito.`,
          icon: 'success'
        });
      });

  }


  cambiarPassword(): void {

    this.formSubmitted = false;
    this.formSubmitted2 = true;

    if ( this.changePasswordForm.invalid ) { return; }

    this.authService.changePassword( this.changePasswordForm.value )
          .subscribe( resp => {
            Swal.fire({
              title: 'Guardado',
              text: `${resp.message}`,
              icon: 'success'
            });
            this.formSubmitted2 = false;
            this.changePasswordForm.reset();
    });

  }


  changeFoto( foto: File ): void{
    this.fotoSubir = foto;

    if ( !foto ) {
      this.fotoTemporal = null;
      return;
    }

    // Pasar la foto a base 64
    const reader = new FileReader();
    reader.readAsDataURL( foto );

    // Mostrar el url
    reader.onloadend = () => {
      this.fotoTemporal = reader.result;
    };

  }


  uploadFoto(): void {


    this.fileUploadService.actualizarFoto( this.fotoSubir, this.usuario._id )
        .subscribe( resp => {
          this.usuario.foto = resp.nombreFoto;
          Swal.fire({
            title: 'Guardado',
            text: resp.message,
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


  campoNoValido( formGroup: FormGroup, campo: string ): boolean {
    return formGroup === this.usuarioForm && formGroup.get(campo)?.invalid && this.formSubmitted ? true :
           formGroup === this.changePasswordForm && formGroup.get(campo)?.invalid && this.formSubmitted2 ? true : false;
  }

  mensajesError( formGroup: FormGroup, campo: string  ): string {
    return formGroup.get(campo)?.hasError('required') ? `Este campo es requerido.` :
           formGroup.get(campo)?.hasError('email') ? `Correo electrónico no valido.` :
           formGroup.get(campo)?.hasError('requiredTrue') ? `Debe aceptar la Política de privacidad.` :
           formGroup.get(campo)?.hasError('noIgual') ? `Las contraseñas no coinciden.` : '';
  }


  aceptaTerminos(): boolean {
    return true;
  }


  passwordsIguales( pass1: string, pass2: string ): any  {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      // Si son iguales no hay error -> null
      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        // Si no son iguales
        pass2Control.setErrors({ noIgual: true });
      }

    };


  }

}
