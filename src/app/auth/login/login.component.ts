import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    numero_control: [ localStorage.getItem('numero_control') || '', [ Validators.required ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    recuerdame: [ false ]
  });

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
  }


  login(): void {

    this.formSubmitted = true;
    if ( this.loginForm.invalid ) { return; }

    this.authService.login( this.loginForm.value )
          .subscribe( () => {

            if ( this.loginForm.get('recuerdame')?.value ){
              localStorage.setItem('numero_control', this.loginForm.get('numero_control')?.value );
            } else {
              localStorage.removeItem('numero_control');
            }

            this.router.navigateByUrl('/');


          }, err => {
              Swal.fire({
                title: 'Error',
                text: err.error.message,
                icon: 'error'
              });
          });


  }


  campoNoValido( campo: string ): boolean {


    if ( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


  mensajesError( campo: string  ): string {

    return this.loginForm.get(campo)?.hasError('required') ? `Este campo es requerido.` :
           this.loginForm.get(campo)?.hasError('minlength') ? `Mínimo 6 caracteres.` : '';
  }



}
