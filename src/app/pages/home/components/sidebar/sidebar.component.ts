import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  datos: any = [];
  role = "";
  constructor() {
   
  }
  

  async ngOnInit() {
      this.role = localStorage.getItem('rol')
  }

}
