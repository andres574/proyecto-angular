import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
// import { LoginComponent } from '../auth/login/login.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  role = '';
  datos:any = [];

  constructor(private auth: AuthService, private route: Router, private authService: AuthService) {
   
  }


  

  
  sideBarOpen = true;

   async ngOnInit() {

      await this.authService.getdatos().then( (res) => {
        this.datos.push(res);
     this.role = this.datos[0].role;
localStorage.setItem('rol',this.role)
      window.location.reload();
        
             
      });
     
   

  }


  logout(){
    try {
      this.auth.onLogout();
      this.route.navigate(['/auth/login'])
      sessionStorage.removeItem("rol"); //deletes token

      window.location.reload();
      
    } catch (error) {
      
    }

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
