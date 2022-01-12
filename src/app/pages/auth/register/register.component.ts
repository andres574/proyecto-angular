import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from 'src/app/shared/models/usuario.intenface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  user: UsuarioModel;

  isEmail = /\S+@\S+\.\S+/;
   numero = /^[+-]?[0-9]+$/;
  letra = '[a-zA-Z ]{0,50}';

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.isEmail),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.letra),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.letra),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numero),
    ]),
    course: new FormControl('', [
      Validators.required,
      Validators.pattern(this.letra),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numero),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('admin')
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

 async onRegister(){

    try {
      const {email, password, firstName} = this.registerForm.value;
      console.log(this.registerForm.value);
      
      const resultRegister = await this.authService.onRegister(email, password, firstName);

      if(resultRegister){
        const resuldbregister = await this.authService.onRegisterDB(this.registerForm.value);
        if(resuldbregister){
           //console.log(this.user);
           
          this.toastr.success(firstName,'Bienvenido');
          localStorage.setItem('email', email.trim());
          this.router.navigate(['/home']);
        }else{
          this.toastr.error("Error, no se pudo registrar en la base de datos", "Error")
        }
      }
       else {
      //this.smsError();
    }
      
    } catch (error) {
      console.log(error);
      
      //this.smsError();
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
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }get lastName() {
    return this.registerForm.get('lastName');
  }get age() {
    return this.registerForm.get('age');
  }get course() {
    return this.registerForm.get('course');
  }get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

}
