import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent   {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  
  constructor(private auth: AuthService, private route: Router) { }

  logout() {
    try {
      this.auth.onLogout();
      this.route.navigate(['/auth/login'])
        window.location.reload();
    } catch (error) {
      
    }
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
