import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from 'src/app/shared/models/usuario.intenface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel;

  isEmail = /\S+@\S+\.\S+/;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.isEmail),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    
  ) {}

  ngOnInit() {
  }

  enviandoDato() {
    const { email, password } = this.loginForm.value;
    this.authService.obteniendo(email);    
  }



  async onLogin() {
    try {
      if (!this.loginForm.valid) {
        return;
      }
      const { email, password } = this.loginForm.value;
      // this.authService.obteniendo(email);

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      });

      Swal.showLoading();

      if (email != '' && password != '') {
        const dbuser = await this.authService.getUserLogin(email.trim());
        const ema2 = await this.authService.obteniendo(email.trim());
        // console.log(ema2)
        this.user = await this.authService.onLogin(
          email.trim(),
          password.trim()
        );
        if (
          this.user["user"]["email"] == dbuser.email &&
          dbuser.status == true
        ) {
         
          Swal.close();
          // console.log(dbuser);
          this.toastr.success(`${dbuser.firstName}`,'Bienvenid@')

          localStorage.setItem('email', email.trim());
          this.router.navigate(['/home']);
          
        } else {
     
          Swal.close();
          this.toastr.error(`contacta al administrador.`,'Error al autenticar la cuenta,')

        }
      }
    } catch (e) {
      if (
        this.user['message'] ==
          'There is no user record corresponding to this identifier. The user may have been deleted.' &&
        this.user != undefined &&
        this.user.status == true
      ) {
        const result = await this.authService.onRegister(
          this.user.email.trim(),
          this.user.password.trim(),
          this.user.firstName
        );
        if (result != undefined) {
          this.toastr.success(`${this.user.firstName}`,'Bienvenido')

          localStorage.setItem('email', this.user.email.trim());
          this.router.navigate(['/home']);
        }
      } else {
        this.smsError();
      }
    }
  }

  async smsError() {
    const msm = 'The password is invalid or the user does not have a password.';
    const msm2 =
      'There is no user record corresponding to this identifier. The user may have been deleted.';
    const msm3 =
      'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
    if (this.user['message'] == msm) {

      this.toastr.error(`La contraseña no es válida`,'Error al autenticar')

    } else if (this.user['message'] == msm2) {

      this.toastr.error(`No existe el usuario.`,'Error al autenticar')

    } else if (this.user['message'] == msm3) {

      this.toastr.error(`El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión.`,'Error al autenticar')

      
    } else {
 
      this.toastr.error(`Hubo un error intenta mas tarde.`,'Error al autenticar')

    }
    Swal.close();
  }
  get email() {
    //  console.log(this.loginForm.get('email'))
     return this.loginForm.get('email');
   }

  
  get password() {
    return this.loginForm.get('password');
  }


  ruta(){
    this.router.navigate(['auth/register']);
  }
}
