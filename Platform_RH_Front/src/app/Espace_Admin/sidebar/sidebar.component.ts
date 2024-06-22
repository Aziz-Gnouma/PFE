import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() enterpriseName!: string;
[x: string]: any;
  constructor(private router: Router ,     private AuthService: AuthService,  public AppServiceService: AppServiceService) {}

   UserName = localStorage.getItem('UserName') || '';



    public isLoggedIn() {
      return this.AuthService.isLoggedIn();
    }

    public logout() {
      this.AuthService.clear();
      this.router.navigate(['']);
    }
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  goToAllEmployees() {
    this.router.navigate(['/allEmployees']);
  }
  

}

