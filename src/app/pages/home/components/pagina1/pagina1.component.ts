import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.scss']
})
export class Pagina1Component implements OnInit {
  datos: any = [];
  role = '';
  constructor( private authService: AuthService) {
  // mensaje = 'por default';
    
   }

  async ngOnInit() {
    this.role = localStorage.getItem('rol')
    
    
  }

}
