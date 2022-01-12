import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-requestpassword',
  templateUrl: './requestpassword.component.html',
  styleUrls: ['./requestpassword.component.scss']
})
export class RequestpasswordComponent implements OnInit {

 
  
  isEmail = /\S+@\S+\.\S+/;

  passForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.isEmail),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  } 

 async onPass(){
    try {
      console.log(this.passForm.value);
      const {email} = this.passForm.value;
     await this.authService.password_Change(email);
    
      this.toastr.success("Por favor revisa tu correo para verificar tu contraseña","Enviado");
          
    } catch (error) {
      
    }
  }

  get email() {
    return this.passForm.get('email');
  }
}
