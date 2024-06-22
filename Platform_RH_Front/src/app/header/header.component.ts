import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../Services/app-service.service';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  constructor(
    public AppServiceService: AppServiceService ,
    private AuthService: AuthService,
    private router: Router ) {}

    ngOnInit(): void {}

    public isLoggedIn() {
      return this.AuthService.isLoggedIn();
    }
  
    public logout() {
      this.AuthService.clear();
      this.router.navigate(['']);
    }
  }
  